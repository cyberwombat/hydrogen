import {
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useServerAnalytics,
  useShopQuery
} from '@shopify/hydrogen'
import type { Collection } from '@shopify/hydrogen/storefront-api-types'
import { Suspense } from 'react'

import { Grid, PageHeader, Section } from '~/components/index.js'
import { CollectionCard, Layout } from '~/components/index.server.js'
import { getImageLoadingPriority, PAGINATION_SIZE } from '~/lib/const.js'

export default function Collections() {
  return (
    <Layout>
      <Seo type="page" data={{ title: 'All Collections' }} />
      <PageHeader heading="Collections" />
      <Section>
        <Suspense>
          <CollectionGrid />
        </Suspense>
      </Section>
    </Layout>
  )
}

function CollectionGrid() {
  const {
    language: { isoCode: languageCode },
    country: { isoCode: countryCode }
  } = useLocalization()

  const { data } = useShopQuery<any>({
    query: COLLECTIONS_QUERY,
    variables: {
      pageBy: PAGINATION_SIZE,
      country: countryCode,
      language: languageCode
    },
    preload: true
  })

  useServerAnalytics({
    shopify: {
      canonicalPath: '/collections',
      pageType: ShopifyAnalyticsConstants.pageType.listCollections
    }
  })

  const collections: Collection[] = data.collections.nodes

  return (
    <Grid items={collections.length === 3 ? 3 : 2}>
      {collections.map((collection, i) => (
        <CollectionCard
          collection={collection}
          key={collection.id}
          loading={getImageLoadingPriority(i, 2)}
        />
      ))}
    </Grid>
  )
}

const COLLECTIONS_QUERY = gql`
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
  ) @inContext(country: $country, language: $language) {
    collections(first: $pageBy) {
      nodes {
        id
        title
        description
        handle
        seo {
          description
          title
        }
        image {
          id
          url
          width
          height
          altText
        }
      }
    }
  }
`
