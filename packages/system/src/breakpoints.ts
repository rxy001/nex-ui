import { __DEV__ } from '@nex-ui/utils'
import { isValidBreakpointValue } from './utils'
import type { Dictionary } from './types'

export type BreakpointsDefinition = Dictionary<string>

export const toMediaKey = (value: string) => `@media (min-width:${value})`

export const createBreakpoints = (breakpoints: BreakpointsDefinition) => {
  const breakpointMap = new Map<string | number, string>()
  const selectorMap = new Map<string | number, string>()

  let index = 0

  for (const breakpointKey in breakpoints) {
    // istanbul ignore if
    if (!Object.hasOwn(breakpoints, breakpointKey)) continue

    const breakpointValue = breakpoints[breakpointKey]
    if (!isValidBreakpointValue(breakpointValue)) {
      if (__DEV__) {
        console.error(
          `[Nex UI] system: Expect the breakpoint value to be a string, but what is currently received is %o.`,
          breakpointValue,
        )
      }

      continue
    }

    breakpointMap.set(breakpointKey, breakpointValue)
    breakpointMap.set(index, breakpointValue)
    selectorMap.set(breakpointKey, toMediaKey(breakpointValue))
    selectorMap.set(index, toMediaKey(breakpointValue))
    index += 1
  }

  return {
    getMediaSelectors: () => Object.fromEntries(selectorMap.entries()),
  }
}

export type Breakpoints = ReturnType<typeof createBreakpoints>
