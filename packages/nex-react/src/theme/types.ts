import type { CSSProperties, CSSInterpolation } from '@nex-ui/system'
import type { defaultConfig } from './preset'

type Config = typeof defaultConfig

declare module '@nex-ui/system' {
  export interface SystemDefinition extends Config {}

  export interface OverwriteCSSProperties {
    _hover?: CSSInterpolation
    _active?: CSSInterpolation
    _disabled?: CSSInterpolation

    _bg?: CSSProperties['backgroundColor']
    _fs?: CSSProperties['fontSize']
    _lh?: CSSProperties['lineHeight']
    _w?: CSSProperties['width']
    _h?: CSSProperties['height']

    _py?: CSSProperties['paddingTop']
    _px?: CSSProperties['paddingLeft']
    _pt?: CSSProperties['paddingTop']
    _pb?: CSSProperties['paddingBottom']
    _pl?: CSSProperties['paddingLeft']
    _pr?: CSSProperties['paddingRight']
    _p?: CSSProperties['padding']

    _mt?: CSSProperties['marginTop']
    _mb?: CSSProperties['marginBottom']
    _ml?: CSSProperties['marginLeft']
    _mr?: CSSProperties['marginRight']
    _mx?: CSSProperties['marginLeft']
    _my?: CSSProperties['marginTop']
    _m?: CSSProperties['margin']
  }
}
