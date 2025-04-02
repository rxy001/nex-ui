import type { Tokens as TokensOverrides } from './generated/tokens'
import type { SemanticTokens as SemanticTokensOverrides } from './generated/semanticTokens'
import type { Scales as ScalesOverrides } from './generated/scales'
import type { Breakpoints as BreakpointsOverrides } from './generated/breakpoints'
import type { Selectors as SelectorsOverrides } from './generated/selectors'
import type { Aliases as AliasesOverrides } from './generated/aliases'

declare module '@nex-ui/system' {
  interface Aliases extends AliasesOverrides {}
  interface Selectors extends SelectorsOverrides {}
  interface Breakpoints extends BreakpointsOverrides {}
  interface Scales extends ScalesOverrides {}
  interface SemanticTokens extends SemanticTokensOverrides {}
  interface Tokens extends TokensOverrides {}
}
