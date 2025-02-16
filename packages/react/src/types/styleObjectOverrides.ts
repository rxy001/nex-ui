import type { StyleObject } from '@nex-ui/system'
import type { Breakpoints } from './generated/breakpoints'
import type { Selectors } from './generated/selectors'
import type { Aliases } from './generated/aliases'
import type { NexUICSSProperties } from './cssProperties'

type ResponsiveColor<T> = {
  _DEFAULT?: T
  _dark?: T
  _light?: T
}

type BreakpointObject<T> = {
  [K in keyof Breakpoints as `_${K}`]: T
}

type BreakpointArray = (string | number)[] | readonly (string | number)[]

type ExtraCSSPropertyValue<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]?:
    | T[K]
    | BreakpointArray
    | ResponsiveColor<T[K]>
    | BreakpointObject<T[K]>
}

type ExtraCSSProperties = {
  [K in keyof Aliases]?: Aliases[K] extends infer CSSProps
    ? CSSProps extends string
      ? CSSProps extends keyof NexUICSSProperties
        ? NexUICSSProperties[CSSProps]
        : never
      : CSSProps extends any[]
        ? CSSProps[number] extends keyof NexUICSSProperties
          ? NexUICSSProperties[CSSProps[0]]
          : never
        : never
    : never
}

type ExtraSelecotrs = {
  [K in keyof Selectors as `_${K}`]?: StyleObject
}

export type StyleObjectOverrides = ExtraCSSPropertyValue<NexUICSSProperties> &
  ExtraCSSPropertyValue<ExtraCSSProperties> &
  ExtraSelecotrs
