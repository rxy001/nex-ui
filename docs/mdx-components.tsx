import { Pre, withIcons } from 'nextra/components'
import { GitHubIcon } from 'nextra/icons'
import { useMDXComponents as getDocsMDXComponents } from './nextraTheme'

const docsComponents = getDocsMDXComponents({
  pre: withIcons(Pre, { js: GitHubIcon }),
})

export const useMDXComponents: typeof getDocsMDXComponents = (components) => {
  return {
    ...docsComponents,
    ...components,
  }
}
