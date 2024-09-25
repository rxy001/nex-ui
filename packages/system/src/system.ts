import { memoizeFn } from './utils'
import { createCvaFn } from './styles'
import { createTokens } from './tokens'
import { createScales } from './scales'
import { createAliases } from './aliases'
import { createBreakpoints } from './breakpoints'
import { createCssFn } from './css'
import { createNormalize } from './normalize'
import type { SystemConfig } from './types'

export const createSystem = (config: SystemConfig) => {
  const {
    cssVarsPrefix = 'system',
    scales,
    aliases,
    breakpoints,
    ...tokens
  } = config

  const { getToken, getCssVars } = createTokens({
    tokens,
    prefix: cssVarsPrefix,
  })

  const { getCategoryByProperty } = createScales(scales)

  const { getPropertiesByAlias } = createAliases(aliases)

  const { handleBreakpoints } = createBreakpoints(breakpoints)

  const normalize = createNormalize({
    getCategoryByProperty,
    getToken,
  })

  const css = memoizeFn(
    createCssFn({ normalize, handleBreakpoints, getPropertiesByAlias }),
  )

  // Class Variance Authority
  const cva = memoizeFn(createCvaFn())

  return {
    cva,
    css,
    globalCssVars: {
      ':root': getCssVars(),
    },
  }
}
