import type { CSSProperties } from '@nex-ui/system'
import type { Tokens } from './generated/tokens'
import type { SemanticTokens } from './generated/semanticTokens'
import type { StyleObjectOverrides as NexStyleObjectOverrides } from './styleObjectOverrides'
import type { InnerIconProps } from '../components/icon/types'

type ColorPalette =
  | CSSProperties['color']
  | Tokens['colors']
  | SemanticTokens['colors']

declare module '@nex-ui/icons' {
  interface IconPropsOverrides extends InnerIconProps {}
}

// 避免 tsc 编译时优化删除掉 NexStyleObjectOverrides
type NexStyleObjectOverridesAlias = NexStyleObjectOverrides

declare module '@nex-ui/system' {
  interface StyleObjectOverrides extends NexStyleObjectOverridesAlias {
    colorPalette?: ColorPalette
  }
}

export {}
