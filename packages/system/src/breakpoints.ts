import { __DEV__, forEach } from '@nex-ui/utils'
import { isValidBreakpointValue } from './utils'
import type { Dictionary } from './types'

export type BreakpointsDefinition = Dictionary<string>

export const toMediaKey = (value: string) => `@media (min-width:${value})`

export const createBreakpoints = (breakpoints: BreakpointsDefinition) => {
  const breakpointMap = new Map<string | number, string>()
  const selectorMap = new Map<string | number, string>()

  let index = 0

  forEach(breakpoints, (value: string, key: string) => {
    if (__DEV__ && !isValidBreakpointValue(value)) {
      console.error(
        `[Nex UI] system: Expect the breakpoints value to be a string, but what is currently received is %o.`,
        value,
      )
      return
    }

    breakpointMap.set(key, value)
    breakpointMap.set(index, value)
    selectorMap.set(key, toMediaKey(value))
    selectorMap.set(index, toMediaKey(value))
    index += 1
  })

  return {
    getMediaSelectors: () => Object.fromEntries(selectorMap.entries()),
  }
}

export type Breakpoints = ReturnType<typeof createBreakpoints>
