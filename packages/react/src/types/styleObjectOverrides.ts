import type { InterpolationPrimitive } from '@nex-ui/system'
import type { Breakpoints } from './generated/breakpoints'
import type { Selectors } from './generated/selectors'
import type { Aliases } from './generated/aliases'
import type { NexUICSSProperties } from './cssProperties'

type BreakpointObject<T> = {
  [K in keyof Breakpoints as `_${K}`]?: T
}

type ExtraSelecotrs<T> = {
  [K in keyof Selectors as `_${K}`]?: T
}

type Conditions<T> = {
  _dark?: T
  _light?: T
} & ExtraSelecotrs<T> &
  BreakpointObject<T>

type BreakpointArray =
  | (string | number | null | undefined)[]
  | readonly (string | number | null | undefined)[]

type NestedConditions<T> =
  | {
      _DEFAULT?: T
    }
  | Conditions<T>
  | { [K in keyof Conditions<T>]: NestedConditions<T> }

type ExtraCSSPropertyValue<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]?:
    | T[K]
    | BreakpointArray
    | NestedConditions<T[K]>
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

export type CSSObjectOverrides = ExtraCSSPropertyValue<NexUICSSProperties> &
  ExtraCSSPropertyValue<ExtraCSSProperties> &
  Conditions<InterpolationPrimitive>
