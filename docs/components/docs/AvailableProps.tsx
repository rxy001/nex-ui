import { Code } from 'nextra/components'
import { defaultConfig } from '@nex-ui/react'
import { Fragment } from 'react'
import type { JSX } from 'react'
import type { TokenCategory } from '@nex-ui/system'

function upperFirst(str: string) {
  return str.replace(/^\w/, (c) => c.toUpperCase())
}

function getAvailablePropsByTokenCategory(tokenCategory: string) {
  return Object.entries(defaultConfig.scales ?? {}).reduce<string[]>(
    (acc, [prop, token]) => {
      if (token === tokenCategory) {
        acc.push(prop)
      }
      return acc
    },
    [],
  )
}

const tokenCategories: TokenCategory[] = [
  'colors',
  'sizes',
  'spaces',
  'borders',
  'borderWidths',
  'fontSizes',
  'fontFamilies',
  'fontWeights',
  'lineHeights',
  'radii',
  'shadows',
  'transitions',
  'zIndices',
]

function factory(props: string[]) {
  return () => {
    return props.map((prop, index, array) => (
      <Fragment key={prop}>
        <Code>{prop}</Code>
        {index === array.length - 1 ? null : '、'}
      </Fragment>
    ))
  }
}

export const AvailableProps = tokenCategories.reduce(
  (acc, token) => {
    return {
      ...acc,
      [upperFirst(token)]: factory(getAvailablePropsByTokenCategory(token)),
    }
  },
  {} as Record<TokenCategory, () => JSX.Element>,
)
