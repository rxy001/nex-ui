import type { CSSProperties, TokenCategories } from '@nex-ui/system'
import type { Tokens } from './generated/tokens'
import type { SemanticTokens } from './generated/semanticTokens'
import type { Scales } from './generated/scales'
import type { Overwrite } from './utils'

type TransformColors<T> = T extends `${string}.${infer U}`
  ? `colorPalette.${U}`
  : 'colorPalette'

type VirtualColors =
  | TransformColors<Tokens['colors']>
  | TransformColors<SemanticTokens['colors']>

type TypeValueByKey<T, K> = K extends keyof T ? T[K] : never

type ExtendedCSSProperties = {
  [K in keyof Scales]: Exclude<Scales[K], undefined> extends TokenCategories
    ?
        | CSSProperties[K]
        | TypeValueByKey<Tokens, Scales[K]>
        | TypeValueByKey<SemanticTokens, Scales[K]>
        | ('colors' extends Scales[K] ? VirtualColors : never)
    : CSSProperties[K]
}

export type NexUICSSProperties = Overwrite<CSSProperties, ExtendedCSSProperties>
