import type { Interpolation } from '../types'

export type CascadeLayer = 'global' | 'css'

export type CreateLayersConfig = {
  cssCascadeLayersDisabled?: boolean
  prefix?: string
}

export type Layers = {
  atRules: string
  wrapWithLayer: (layer: CascadeLayer, styles: Interpolation) => Interpolation
}
