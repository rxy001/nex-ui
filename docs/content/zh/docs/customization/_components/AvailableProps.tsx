import { Code } from 'nextra/components'
import { defaultConfig } from '@nex-ui/react'
import type { TokenCategory } from '@nex-ui/system'
import { reduce } from '@nex-ui/utils'

function upperFirst(str: string) {
  return str.replace(/^\w/, (c) => c.toUpperCase())
}

function getAvailablePropsByTokenCategory(tokenCategory: string) {
  return reduce<{}, string[]>(
    defaultConfig.scales,
    (acc, key, value) => {
      if (key === tokenCategory) {
        return [...acc, value]
      }
      return acc
    },
    [],
  )
}

const tokenCategories: TokenCategory[] = [
  'colors',
  'sizes',
  'spacing',
  'borders',
  'borderWidths',
  'fontSizes',
  'fontFamilies',
  'fontWeights',
  'lineHeights',
  'radii',
  'shadows',
  'transitions',
  'zIndexes',
]

function factory(props: string[]) {
  return () => {
    return props.map((prop, index, array) => (
      <>
        <Code>{prop}</Code>
        {index === array.length - 1 ? null : '、'}
      </>
    ))
  }
}

export const AvailableProps = reduce(
  tokenCategories,
  (acc, token: TokenCategory) => {
    return {
      ...acc,
      [upperFirst(token)]: factory(getAvailablePropsByTokenCategory(token)),
    }
  },
  {} as Record<TokenCategory, () => JSX.Element>,
)
