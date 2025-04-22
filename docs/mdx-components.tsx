import { Pre, withIcons } from 'nextra/components'
import { GithubOutlined } from '@nex-ui/icons'
import {
  Example,
  ComponentLinks,
  PropsTable,
  SlotsTable,
  FlexCenter,
} from '@/components'
import { useMDXComponents as getDocsMDXComponents } from './nextraTheme'

const docsComponents = getDocsMDXComponents({
  // @ts-ignore
  pre: withIcons(Pre, { js: GithubOutlined }),
  Example,
  ComponentLinks,
  PropsTable,
  SlotsTable,
  FlexCenter,
})

export const useMDXComponents: typeof getDocsMDXComponents = (components) => {
  return {
    ...docsComponents,
    ...components,
  }
}
