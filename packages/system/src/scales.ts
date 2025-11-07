import { __DEV__ } from '@nex-ui/utils'
import { isValidTokenCategory } from './utils'
import type { TokenCategory } from './tokens'
import type { CSSProperties } from './types'

export type ScalesDefinition = {
  [property in keyof CSSProperties]?: TokenCategory
}

export function createScales(scales: ScalesDefinition) {
  const scaleMap = new Map<string, TokenCategory>()

  for (const property in scales) {
    // istanbul ignore if
    if (!Object.hasOwn(scales, property)) continue

    const category = scales[property as keyof CSSProperties]

    if (!isValidTokenCategory(category)) {
      if (__DEV__) {
        console.error('[Nex-UI] sacles: Unknown token category: %s.', category)
      }

      continue
    }

    scaleMap.set(property, category!)
  }

  return {
    getCategoryByProperty: (key: string) => scaleMap.get(key),
  }
}

export type Scales = ReturnType<typeof createScales>
