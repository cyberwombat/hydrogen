import {
  CartProvider,
  FileRoutes,
  PerformanceMetrics,
  PerformanceMetricsDebug,
  Route,
  Router,
  Seo,
  ShopifyAnalytics,
  ShopifyProvider,
  useServerAnalytics,
  useSession,
  type HydrogenRouteProps
} from '@shopify/hydrogen'
import renderHydrogen from '@shopify/hydrogen/entry-server'
import type { CountryCode } from '@shopify/hydrogen/storefront-api-types'
import { Suspense } from 'react'
import { EventsListener, HeaderFallback } from '~/components/index.js'
import { NotFound } from '~/components/index.server.js'

function App({ request }: HydrogenRouteProps) {
  const pathname = new URL(request.normalizedUrl).pathname
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname)
  const countryCode = localeMatch ? (localeMatch[1] as CountryCode) : undefined

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`

  const { customerAccessToken } = useSession()

  useServerAnalytics({
    shopify: {
      isLoggedIn: !!customerAccessToken
    }
  })

  return (
    <Suspense fallback={<HeaderFallback isHome={isHome} />}>
      <EventsListener />
      <ShopifyProvider countryCode={countryCode}>
        <Seo
          type="defaultSeo"
          data={{
            title: 'Hydrogen',
            description:
              "A custom storefront powered by Hydrogen, Shopify's React-based framework for building headless.",
            titleTemplate: `%s · Hydrogen`
          }}
        />
        <CartProvider
          countryCode={countryCode}
          customerAccessToken={customerAccessToken}
        >
          <Router>
            <FileRoutes
              basePath={countryCode ? `/${countryCode}/` : undefined}
            />
            <Route path="*" page={<NotFound />} />
          </Router>
        </CartProvider>
        <PerformanceMetrics />
        {import.meta.env.DEV && <PerformanceMetricsDebug />}
        <ShopifyAnalytics cookieDomain="hydrogen.shop" />
      </ShopifyProvider>
    </Suspense>
  )
}

export default renderHydrogen.default(App)
