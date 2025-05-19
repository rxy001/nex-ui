import { Search } from 'nextra/components'
import { NexUIProvider } from '@nex-ui/react'
import { element, stringOrElement } from 'nextra/schemas'
import type { FC, ReactNode } from 'react'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { LastUpdated } from './components/last-updated'
import { MobileNav } from './components/sidebar'
import { ConfigProvider, ThemeConfigProvider } from './stores'

const theme = z.strictObject({
  banner: element.optional(),
  darkMode: z.boolean().default(true),
  docsRepositoryBase: z
    .string()
    .startsWith('https://')
    .default('https://github.com/shuding/nextra'),
  editLink: stringOrElement.or(z.null()).default('Edit this page'),
  feedback: z
    .strictObject({
      content: stringOrElement
        .or(z.null())
        .default('Question? Give us feedback'),
      labels: z.string().default('feedback'),
    })
    .default({}),
  footer: element,
  i18n: z
    .array(
      z.strictObject({
        locale: z.string(),
        name: z.string(),
      }),
    )
    .default([]),
  lastUpdated: element.default(<LastUpdated />),
  navbar: element,
  navigation: z
    .union([
      z.boolean(),
      z.strictObject({
        next: z.boolean(),
        prev: z.boolean(),
      }),
    ])
    .default(true)
    .transform((v) => (typeof v === 'boolean' ? { next: v, prev: v } : v)),
  pageMap: z.array(z.any({})),
  search: z.union([element, z.null()]).default(<Search />),
  sidebar: z
    .strictObject({
      autoCollapse: z.boolean().optional(),
      defaultMenuCollapseLevel: z.number().min(1).int().default(2),
      defaultOpen: z.boolean().default(true),
      toggleButton: z.boolean().default(true),
    })
    .default({}),
  themeSwitch: z
    .strictObject({
      dark: z.string().default('Dark'),
      light: z.string().default('Light'),
      system: z.string().default('System'),
    })
    .default({}),
  toc: z
    .strictObject({
      backToTop: stringOrElement.or(z.null()).default('Scroll to top'),
      extraContent: stringOrElement.optional(),
      float: z.boolean().default(true),
      title: stringOrElement.default('On This Page'),
    })
    .default({}),
})

export type ThemeConfigProps = z.infer<typeof theme>

type LayoutProps = z.input<typeof theme> & { children: ReactNode }

export const Layout: FC<LayoutProps> = ({ children, ...themeConfig }) => {
  const { data, error } = theme.safeParse(themeConfig)
  if (error) {
    throw fromZodError(error)
  }
  const { navbar, pageMap, banner, ...rest } = data

  return (
    <NexUIProvider
      colorScheme={{ colorSchemeSelector: 'class', defaultMode: 'dark' }}
    >
      <ThemeConfigProvider value={rest}>
        {banner}
        <ConfigProvider pageMap={pageMap} navbar={navbar}>
          {/*
           * MobileNav should be in layout and not in mdx wrapper, otherwise for non mdx pages will
           * be not rendered
           */}
          <MobileNav />
          {children}
        </ConfigProvider>
      </ThemeConfigProvider>
    </NexUIProvider>
  )
}
