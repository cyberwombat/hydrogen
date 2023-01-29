import { Seo } from '@shopify/hydrogen'
import { CartDetails, PageHeader, Section } from '~/components/index.js'
import { Layout } from '~/components/index.server.js'

export default function Cart() {
  return (
    <Layout>
      <Seo type="page" data={{ title: 'Cart' }} />
      <PageHeader heading="Your Cart" className="max-w-7xl mx-auto" />
      <Section className="max-w-7xl mx-auto">
        <CartDetails layout="page" />
      </Section>
    </Layout>
  )
}
