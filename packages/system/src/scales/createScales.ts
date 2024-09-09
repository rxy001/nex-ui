import { forEach, isString } from '@nex-ui/utils'
import { checkTokenCategory } from '../utils'
import type { TokenCategory } from '../tokens'
import type { CreateScalesConfig, CSSProperty } from './types'

export function createScales({ scales }: CreateScalesConfig) {
  const scaleMap = new Map<CSSProperty, TokenCategory>()

  if (scales) {
    forEach(scales, (category: TokenCategory | undefined, p: string) => {
      const property = p as CSSProperty
      if (isString(category) && checkTokenCategory(category)) {
        scaleMap.set(property, category)
        return
      }

      console.error(`system: Unknown token category '${category}'`)
    })
  }

  return {
    getCategoryBasedOnProperty: (key: string) =>
      scaleMap.get(key as CSSProperty),
  }
}
