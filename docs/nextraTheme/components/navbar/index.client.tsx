'use client'

import {
  MenuItem as _MenuItem,
  Menu,
  MenuButton,
  MenuItems,
} from '@headlessui/react'
import cn from 'clsx'
import { Anchor, Button } from 'nextra/components'
import { useFSRoute } from 'nextra/hooks'
import { ArrowRightIcon, MenuIcon } from 'nextra/icons'
import { setMenu, useConfig, useMenu, useThemeConfig } from '../../stores'
import type { MenuItem } from 'nextra/normalize-pages'
import type { FC, ReactNode } from 'react'

const classes = {
  link: cn(
    'x:text-sm x:contrast-more:text-gray-700 x:contrast-more:dark:text-gray-100 x:whitespace-nowrap',
    'x:text-gray-600 x:hover:text-gray-800 x:dark:text-gray-100 x:dark:hover:text-gray-300',
    'x:ring-inset x:transition-colors',
    'x:font-medium',
  ),
}

const NavbarMenu: FC<{
  menu: MenuItem
  children: ReactNode
}> = ({ menu, children }) => {
  const routes = Object.fromEntries(
    (menu.children || []).map((route) => [route.name, route]),
  )
  return (
    <Menu>
      <MenuButton
        className={({ focus }) =>
          cn(
            classes.link,
            'x:items-center x:flex x:gap-1.5 x:cursor-pointer',
            focus && 'x:nextra-focus',
          )
        }
      >
        {children}
        <ArrowRightIcon
          height='14'
          className='x:*:origin-center x:*:transition-transform x:*:rotate-90'
        />
      </MenuButton>
      <MenuItems
        transition
        className={cn(
          'x:focus-visible:nextra-focus',
          'nextra-scrollbar x:origin-top x:transition x:duration-200 x:ease-out x:data-closed:scale-95 x:data-closed:opacity-0 x:motion-reduce:transition-none',
          'x:border x:border-black/5 x:dark:border-white/20',
          'x:backdrop-blur-md x:bg-nextra-bg/70',
          'x:z-20 x:rounded-md x:py-1 x:text-sm x:shadow-lg',
          // headlessui adds max-height as style, use !important to override
          'x:max-h-[min(calc(100vh-5rem),256px)]!',
        )}
        anchor={{ to: 'bottom', gap: 10, padding: 16 }}
      >
        {Object.entries(
          (menu.items as Record<string, { title: string; href?: string }>) ||
            {},
        ).map(([key, item]) => (
          // eslint-disable-next-line react/jsx-pascal-case
          <_MenuItem
            key={key}
            as={Anchor}
            href={item.href || routes[key]?.route}
            className={({ focus }) =>
              cn(
                'x:block x:py-1.5 x:transition-colors x:ps-3 x:pe-9',
                focus
                  ? 'x:text-gray-900 x:dark:text-gray-100'
                  : 'x:text-gray-600 x:dark:text-gray-400',
              )
            }
          >
            {item.title}
          </_MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}

const isMenu = (page: any): page is MenuItem => page.type === 'menu'

export const ClientNavbar: FC<{
  children: ReactNode
}> = ({ children }) => {
  const items = useConfig().normalizePagesResult.topLevelNavbarItems

  const themeConfig = useThemeConfig()

  const pathname = useFSRoute()
  const menu = useMenu()

  return (
    <>
      <div className='nextra-scrollbar x:flex x:gap-4 x:overflow-x-auto x:py-1.5 x:max-lg:hidden'>
        {items.map((page) => {
          if ('display' in page && page.display === 'hidden') return
          if (isMenu(page)) {
            return (
              <NavbarMenu key={page.name} menu={page}>
                {page.title}
              </NavbarMenu>
            )
          }
          let href = page.href || page.route || '#'

          // If it's a directory
          if (page.children) {
            href =
              ('frontMatter' in page ? page.route : page.firstChildRoute) ||
              href
          }

          const isCurrentPage =
            page.route === pathname ||
            pathname.startsWith(`${href.split('/').slice(0, 3).join('/')}`) ||
            undefined

          return (
            <Anchor
              href={href}
              key={href}
              className={cn(
                classes.link,
                'x:aria-[current="true"]:last-of-type:font-medium x:aria-[current="true"]:text-blue-600 x:dark:aria-[current="true"]:last-of-type:text-blue-400 x:aria-[current="true"]:subpixel-antialiased',
              )}
              aria-current={isCurrentPage}
            >
              {page.title}
            </Anchor>
          )
        })}
      </div>
      {themeConfig.search && (
        <div className='x:max-md:hidden'>{themeConfig.search}</div>
      )}
      {children}
      <Button
        aria-label='Menu'
        className={({ active }) =>
          cn('nextra-hamburger x:md:hidden', active && 'x:bg-gray-400/20')
        }
        onClick={() => setMenu((prev) => !prev)}
      >
        <MenuIcon height='24' className={cn({ open: menu })} />
      </Button>
    </>
  )
}
