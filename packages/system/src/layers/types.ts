import type { Interpolation } from '../types'

export type CascadeLayer = 'preflight' | 'theme' | 'css'

export interface CreateLayersConfig {
  disableCascadeLayers?: boolean
  prefix?: string
}

export interface Layers {
  atRules: string
  wrapWithLayer: (layer: CascadeLayer, styles: Interpolation) => Interpolation
}
