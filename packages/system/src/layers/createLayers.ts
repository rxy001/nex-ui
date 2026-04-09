import { isPlainObject } from '@nex-ui/utils'
import type { Interpolation } from '../types'
import type { CascadeLayer, CreateLayersConfig } from './types'

const layerOrder = ['theme', 'preflight', 'css'] as const

export function createLayers({
  prefix,
  disableCascadeLayers,
}: CreateLayersConfig) {
  return {
    atRules: `@layer ${layerOrder.map((layer) => `${prefix}.${layer}`).join(', ')};`,
    wrapWithLayer: (layer: CascadeLayer, styles: Interpolation) => {
      if (
        disableCascadeLayers === true ||
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
