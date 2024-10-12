import { forEach, isString } from '@nex-ui/utils'
import type { Breakpoints } from './breakpoints'

export type SelectorsDefinition = {
  [selector: string]: string
}

type Config = {
  selectors: SelectorsDefinition
  getMediaSelectors: Breakpoints['getMediaSelectors']
}

export function createSelectors({ selectors, getMediaSelectors }: Config) {
  const selectorMap: Map<string, string> = new Map()

  forEach(selectors, (value: string, key: string) => {
    if (isString(value)) {
      selectorMap.set(`_${key}`, value)
    }
    // else {
    //   console.error(
    //     `system: The value of this alias must be a string. ${key}: ${value}`,
    //   )
    // }
  })

  const mediaSelectors = getMediaSelectors()

  forEach(mediaSelectors, (selector, key) => {
    const k = `_${key}`

    if (selectorMap.get(k)) {
      throw new Error('')
    }

    selectorMap.set(k, selector)
  })

  return {
    getCustomizedSelector: (key: string) => selectorMap.get(key),
  }
}

export type Selectors = ReturnType<typeof createSelectors>
