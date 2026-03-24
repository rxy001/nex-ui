import type { Interpolation } from '../types'

export type CascadeLayer = 'global' | 'css'

export interface CreateLayersConfig {
  cssCascadeLayersDisabled?: boolean
  prefix?: string
}

export interface Layers {
  atRules: string
  wrapWithLayer: (layer: CascadeLayer, styles: Interpolation) => Interpolation
}
