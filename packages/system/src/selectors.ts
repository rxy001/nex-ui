import { forEach, isString } from '@nex-ui/utils'
import type { Breakpoints } from './breakpoints'
import type { Dictionary } from './types'

export type SelectorsDefinition = Dictionary<string>

type Config = {
  selectors: SelectorsDefinition
  getMediaSelectors: Breakpoints['getMediaSelectors']
}

export function createSelectors({ selectors, getMediaSelectors }: Config) {
  const selectorMap: Map<string, string> = new Map()

  forEach(selectors, (value: string, key: string) => {
    if (!isString(value)) {
      console.error(
        `[Nex UI] selectors: Expect the selector value to be a string, but what is currently received is %o.`,
        value,
      )
      return
    }
    selectorMap.set(`_${key}`, value)
  })

  const mediaSelectors = getMediaSelectors()

  forEach(mediaSelectors, (selector: string, key: string) => {
    const k = `_${key}`

    if (selectorMap.get(k)) {
      console.error(
        '[Nex UI] selectors: The selector %s has already been defined in the breakpoint.',
        selector,
      )
      return
    }

    selectorMap.set(k, selector)
  })

  return {
    getCustomizedSelector: (key: string) => selectorMap.get(key),
  }
}

export type Selectors = ReturnType<typeof createSelectors>
