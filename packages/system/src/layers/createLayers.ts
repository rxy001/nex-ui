import { isPlainObject } from '@nex-ui/utils'
import type { Interpolation } from '../types'
import type { CascadeLayer, CreateLayersConfig } from './types'

const layerOrder = ['global', 'css'] as const

export const createLayers = ({
  prefix,
  cssCascadeLayersDisabled,
}: CreateLayersConfig) => {
  return {
    atRules: `@layer ${layerOrder.map((layer) => `${prefix}.${layer}`).join(', ')};`,
    wrapWithLayer: (layer: CascadeLayer, styles: Interpolation) => {
      if (
        cssCascadeLayersDisabled === true ||
        !styles ||
        typeof styles === 'number' ||
        typeof styles === 'string' ||
        (Array.isArray(styles) && styles.length === 0) ||
        (isPlainObject(styles) && Object.keys(styles).length === 0)
      )
        return styles

      return { [`@layer ${prefix}.${layer}`]: styles }
    },
  }
}
