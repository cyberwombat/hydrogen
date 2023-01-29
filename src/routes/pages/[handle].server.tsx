import {
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useServerAnalytics,
  useShopQuery,
  type HydrogenRouteProps
} from '@shopify/hydrogen'
import { Page } from '@shopify/hydrogen/storefront-api-types'
import { Suspense } from 'react'

import { PageHeader } from '~/components/index.js'
import { Layout, NotFound } from '~/components/index.server.js'

export default function Page({ params }: HydrogenRouteProps) {
  const {
    language: { isoCode: languageCode }
  } = useLocalization()

  const { handle } = params
  const {
    data: { page }
  } = useShopQuery<{ page: Page }>({
    query: PAGE_QUERY,
    variables: { languageCode, handle }
  })

  if (!page) {
    return <NotFound />
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.page,
      resourceId: page.id
    }
  })

  return (
    <Layout>
      <Suspense>
        <Seo type="page" data={page} />
      </Suspense>
      <PageHeader heading={page.title}>
        <div
          dangerouslySetInnerHTML={{ __html: page.body }}
          className="prose dark:prose-invert"
        />
      </PageHeader>
    </Layout>
  )
}

const PAGE_QUERY = gql`
  query PageDetails($languageCode: LanguageCode, $handle: String!)
  @inContext(language: $languageCode) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`
