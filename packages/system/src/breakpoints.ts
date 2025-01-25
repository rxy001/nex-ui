import { forEach, isString } from '@nex-ui/utils'
import type { Dictionary } from './types'

export type BreakpointsDefinition = Dictionary<string>

export const toMediaKey = (value: string) => `@media (min-width:${value})`

export const createBreakpoints = (breakpoints: BreakpointsDefinition) => {
  const breakpointMap = new Map<string | number, string>()
  const selectorMap = new Map<string | number, string>()

  let index = 0
  forEach(breakpoints, (value: string, key: string) => {
    if (!isString(value)) {
      console.error(
        `nex-system: The breakpoint value must be a string. ${key}: ${value}`,
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
