import {
  forEach,
  isPlainObject,
  reduce,
  isString,
  isNumber,
} from '@nex-ui/utils'

import type { BreakpointsDefinition } from './types'

export const createBreakpoints = (breakpoints?: BreakpointsDefinition) => {
  const breakpointsMap = new Map<string, string>()
  const breakpointsArray: string[] = []

  if (breakpoints) {
    forEach(breakpoints, (value: string, key: string) => {
      breakpointsMap.set(key, value)
      breakpointsArray.push(value)
    })
  }

  const getBreakpointValue = (key: string | number) => {
    if (isString(key)) {
      return breakpointsMap.get(key)
    }

    if (isNumber(key)) {
      return breakpointsArray[key]
    }
  }

  const handleBreakpoints = (property: string, propertyValue: any) => {
    if (Array.isArray(propertyValue) || isPlainObject(propertyValue)) {
      return reduce(
        propertyValue,
        (acc: any, value: any, breakpoint: number | string) => {
          const breakpointValue = getBreakpointValue(breakpoint)
          if (breakpointValue) {
            const mediaKey = `@media (min-width:${breakpointValue})`
            acc[mediaKey] = {
              ...acc[mediaKey],
              [property]: value,
            }
          }
          return acc
        },
        {},
      )
    }

    return {}
  }

  return {
    getBreakpointValue,
    handleBreakpoints,
  }
}
