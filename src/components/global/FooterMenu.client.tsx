import { Disclosure } from '@headlessui/react'
import { Link } from '@shopify/hydrogen'
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal
} from 'react'

import { Heading, IconCaret } from '~/components/index.js'
import type { EnhancedMenu, EnhancedMenuItem } from '~/lib/utils.js'

/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu({ menu }: { menu?: EnhancedMenu }) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6'
  }

  return (
    <>
      {(menu?.items || []).map((item: EnhancedMenuItem) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 && (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Disclosure.Panel static>
                      <nav className={styles.nav}>
                        {item.items.map(
                          (subItem: {
                            id: Key | null | undefined
                            to: string
                            target: string | (string & {}) | undefined
                            title:
                              | string
                              | number
                              | boolean
                              | ReactElement<
                                  any,
                                  string | JSXElementConstructor<any>
                                >
                              | ReactFragment
                              | ReactPortal
                              | null
                              | undefined
                          }) => (
                            <Link
                              key={subItem.id}
                              to={subItem.to}
                              target={subItem.target}
                            >
                              {subItem.title}
                            </Link>
                          )
                        )}
                      </nav>
                    </Disclosure.Panel>
                  </div>
                )}
              </>
            )}
          </Disclosure>
        </section>
      ))}{' '}
    </>
  )
}
