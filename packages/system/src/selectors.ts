import { __DEV__, isString } from '@nex-ui/utils'
import type { Breakpoints } from './breakpoints'
import type { Dictionary } from './types'

export type SelectorsDefinition = Dictionary<string>

type Config = {
  selectors: SelectorsDefinition
  getMediaSelectors: Breakpoints['getMediaSelectors']
}

export function createSelectors({ selectors, getMediaSelectors }: Config) {
  const selectorMap: Map<string, string> = new Map()

  for (const selectorKey in selectors) {
    // istanbul ignore if
    if (!Object.hasOwn(selectors, selectorKey)) continue

    const selectorValue = selectors[selectorKey]

    if (!isString(selectorValue)) {
      console.error(
        `[Nex UI] system: Expect the selector value to be a string, but what is currently received is %o.`,
        selectorValue,
      )
      continue
    }
    selectorMap.set(`_${selectorKey}`, selectorValue)
  }

  const mediaSelectors = getMediaSelectors()

  for (const selectorKey in mediaSelectors) {
    // istanbul ignore if
    if (!Object.hasOwn(mediaSelectors, selectorKey)) continue

    const selectorValue = mediaSelectors[selectorKey]

    const key = `_${selectorKey}`

    if (selectorMap.get(key)) {
      if (__DEV__) {
        console.error(
          '[Nex UI] system: The selector %s has already been defined in the breakpoint.',
          selectorValue,
        )
      }
      continue
    }
    selectorMap.set(key, selectorValue)
  }

  return {
    getCustomizedSelector: (key: string) => selectorMap.get(key),
  }
}

export type Selectors = ReturnType<typeof createSelectors>
