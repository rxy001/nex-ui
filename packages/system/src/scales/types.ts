import type { CSSProperties } from 'react'
import type { TokenCategory } from '../tokens'

export type CSSProperty = keyof CSSProperties

export type ScalesDefinition = {
  [property in CSSProperty]?: TokenCategory
}

export type CreateScalesConfig = {
  scales?: ScalesDefinition
}
