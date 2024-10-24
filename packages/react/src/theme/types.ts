import type { RawCSSProperties } from '@nex-ui/system'
import type { NexStyledComponentProps as StyledComponentProps } from '@nex-ui/styled'
import type { Tokens } from './generated/tokens'
import type { SemanticTokens } from './generated/semanticTokens'

export type { NexCSSProperties } from './generated/cssProperties'

type ColorPalette =
  | Tokens['colors']
  | SemanticTokens['colors']
  | RawCSSProperties['color']

export type NexStyledComponentProps<T> = Omit<
  StyledComponentProps<T>,
  'colorPalette'
> & {
  colorPalette?: ColorPalette
}

export type ComponentColor =
  | 'blue'
  | 'gray'
  | 'pink'
  | 'purple'
  | 'cyan'
  | 'red'
  | 'green'
  | 'yellow'
  | 'orange'
