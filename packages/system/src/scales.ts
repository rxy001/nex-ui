import { __DEV__, forEach } from '@nex-ui/utils'
import { isValidTokenCategory } from './utils'
import type { TokenCategory } from './tokens'
import type { CSSProperties } from './types'

export type ScalesDefinition = {
  [property in keyof CSSProperties]?: TokenCategory
}

export function createScales(scales: ScalesDefinition) {
  const scaleMap = new Map<string, TokenCategory>()

  forEach<ScalesDefinition>(
    scales,
    (category: TokenCategory | undefined, property: string) => {
      if (__DEV__ && !isValidTokenCategory(category)) {
        console.error('[Nex-UI] sacles: Unknown token category: %s.', category)

        return
      }

      scaleMap.set(property, category!)
    },
  )

  return {
    getCategoryByProperty: (key: string) => scaleMap.get(key),
  }
}

export type Scales = ReturnType<typeof createScales>
