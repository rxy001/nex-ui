import type { CSSProperties } from '@nex-ui/system'
import type { Tokens } from './generated/tokens'
import type { SemanticTokens } from './generated/semanticTokens'
import type { CSSObjectOverrides as NexCSSObjectOverrides } from './styleObjectOverrides'
import type { InnerIconProps } from '../components/icon/types'

type ColorPalette =
  | CSSProperties['color']
  | Tokens['colors']
  | SemanticTokens['colors']

declare module '@nex-ui/icons' {
  interface IconPropsOverrides extends InnerIconProps {}
}

// 避免 tsc 编译时优化删除掉 NexCSSObjectOverrides
type NexCSSObjectOverridesAlias = NexCSSObjectOverrides

declare module '@nex-ui/system' {
  interface CSSObjectOverrides extends NexCSSObjectOverridesAlias {
    colorPalette?: ColorPalette
  }
}

export {}
