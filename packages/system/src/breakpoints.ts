import { forEach } from '@nex-ui/utils'
import type { Dictionary } from './types'

export type BreakpointsDefinition = Dictionary<string>

export const createBreakpoints = (breakpoints: BreakpointsDefinition) => {
  const breakpointMap = new Map<string | number, string>()
  const selectorMap = new Map<string | number, string>()

  let index = 0
  forEach(breakpoints, (value: string, key: string) => {
    const mediaKey = `@media (min-width:${value})`

    breakpointMap.set(key, value)
    breakpointMap.set(index, value)
    selectorMap.set(key, mediaKey)
    selectorMap.set(index, mediaKey)
    index += 1
  })

  return {
    getMediaSelectors: () => Object.fromEntries(selectorMap.entries()),
  }
}

export type Breakpoints = ReturnType<typeof createBreakpoints>
