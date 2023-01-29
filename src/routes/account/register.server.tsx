import {
  CacheNone,
  gql,
  Seo,
  type HydrogenApiRouteOptions,
  type HydrogenRequest,
  type HydrogenRouteProps
} from '@shopify/hydrogen'
import { Suspense } from 'react'

import { AccountCreateForm } from '~/components/index.js'
import { Layout } from '~/components/index.server.js'
import { getApiErrorMessage } from '~/lib/utils.js'

export default function Register({ response }: HydrogenRouteProps) {
  response.cache(CacheNone())

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{ title: 'Register' }} />
      </Suspense>
      <AccountCreateForm />
    </Layout>
  )
}

export async function api(
  request: HydrogenRequest,
  { queryShop }: HydrogenApiRouteOptions
) {
  const jsonBody = await request.json()

  if (!jsonBody.email || !jsonBody.password) {
    return new Response(
      JSON.stringify({ error: 'Email and password are required' }),
      { status: 400 }
    )
  }

  const { data, errors } = await queryShop<{ customerCreate: any }>({
    query: CUSTOMER_CREATE_MUTATION,
    variables: {
      input: {
        email: jsonBody.email,
        password: jsonBody.password,
        firstName: jsonBody.firstName,
        lastName: jsonBody.lastName
      }
    },
    // @ts-expect-error `queryShop.cache` is not yet supported but soon will be.
    cache: CacheNone()
  })

  const errorMessage = getApiErrorMessage('customerCreate', data, errors)

  if (
    !errorMessage &&
    data &&
    data.customerCreate &&
    data.customerCreate.customer &&
    data.customerCreate.customer.id
  ) {
    return new Response(null, {
      status: 200
    })
  } else {
    return new Response(
      JSON.stringify({
        error: errorMessage ?? 'Unknown error'
      }),
      { status: 401 }
    )
  }
}

const CUSTOMER_CREATE_MUTATION = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`
