import type { RawCSSProperties } from '@nex-ui/system'
import type { Tokens } from './generated/tokens'
import type { SemanticTokens } from './generated/semanticTokens'
import type { StyleObjectOverrides as NexStyleObjectOverrides } from './generated/cssProperties'
import type { InnerIconProps } from '../../components/icon/types'

type ColorPalette =
  | RawCSSProperties['color']
  | Tokens['colors']
  | SemanticTokens['colors']

declare module '@nex-ui/icons' {
  interface IconPropsOverrides extends InnerIconProps {}
}

declare module '@nex-ui/system' {
  interface StyleObjectOverrides extends NexStyleObjectOverrides {
    colorPalette?: ColorPalette
  }
}
