import type { Tokens as TokensOverrides } from './generated/tokens'
import type { SemanticTokens as SemanticTokensOverrides } from './generated/semanticTokens'
import type { Scales as ScalesOverrides } from './generated/scales'
import type { Breakpoints as BreakpointsOverrides } from './generated/breakpoints'
import type { Selectors as SelectorsOverrides } from './generated/selectors'
import type { Aliases as AliasesOverrides } from './generated/aliases'

// Prevent rollup-plugin-ts from optimizing away type aliases during the bundling process.
type _TokensOverrides = TokensOverrides
type _SemanticTokensOverrides = SemanticTokensOverrides
type _ScalesOverrides = ScalesOverrides
type _BreakpointsOverrides = BreakpointsOverrides
type _SelectorsOverrides = SelectorsOverrides
type _AliasesOverrides = AliasesOverrides

declare module '@nex-ui/system' {
  interface Aliases extends _AliasesOverrides {}
  interface Selectors extends _SelectorsOverrides {}
  interface Breakpoints extends _BreakpointsOverrides {}
  interface Scales extends _ScalesOverrides {}
  interface SemanticTokens extends _SemanticTokensOverrides {}
  interface Tokens extends _TokensOverrides {}
}
