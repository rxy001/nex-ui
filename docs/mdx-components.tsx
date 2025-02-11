import { Pre, withIcons } from 'nextra/components'
import { GitHubIcon } from 'nextra/icons'
import { Example, ComponentLinks, PropsTable, SlotsTable } from '@/components'
import { useMDXComponents as getDocsMDXComponents } from './nextraTheme'

const docsComponents = getDocsMDXComponents({
  pre: withIcons(Pre, { js: GitHubIcon }),
  Example,
  ComponentLinks,
  PropsTable,
  SlotsTable,
})

export const useMDXComponents: typeof getDocsMDXComponents = (components) => {
  return {
    ...docsComponents,
    ...components,
  }
}
