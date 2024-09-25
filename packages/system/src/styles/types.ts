import type { SerializedStyles } from '@emotion/react'
import type { StyleObject } from '../types'

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

export type SlotGroups = Record<string, StyleObject>

type BaseVariantGroups = Record<string, Record<string, StyleObject>>

type SlotVariantGroups<S extends SlotGroups | string = string> = Record<
  string,
  Record<string, Partial<Record<keyof S, StyleObject>>>
>

export type CompoundVariantsSelection<
  V extends BaseVariantGroups | SlotVariantGroups,
> = {
  [K in keyof V]?: BooleanMap<keyof V[K]> | BooleanMap<keyof V[K]>[]
}

export type CompoundVariants<
  V extends BaseVariantGroups | SlotVariantGroups,
  S,
> = Array<
  CompoundVariantsSelection<V> & {
    css: S extends SlotGroups
      ? {
          [K in keyof S]?: StyleObject
        }
      : StyleObject
  }
>

export type VariantGroups<S> = S extends SlotGroups
  ? SlotVariantGroups<S>
  : BaseVariantGroups

export type VariantSelection<V extends BaseVariantGroups | SlotVariantGroups> =
  {
    [K in keyof V]?: BooleanMap<keyof V[K]>
  }

export type StylesDefinition<
  S extends StyleObject | SlotGroups,
  V extends VariantGroups<S>,
> = {
  slots?: S
  base?: S
  variants?: V
  defaultVariants?: VariantSelection<V>
  compoundVariants?: CompoundVariants<V, S>
}

export type BaseStylesDefinition<
  B extends StyleObject = StyleObject,
  V extends VariantGroups<B> = VariantGroups<B>,
> = {
  base: B
  variants?: V
  defaultVariants?: VariantSelection<V>
  compoundVariants?: CompoundVariants<V, B>
}

export type SlotStylesDefinition<
  S extends SlotGroups = SlotGroups,
  V extends VariantGroups<S> = VariantGroups<S>,
> = {
  slots: S
  variants?: V
  defaultVariants?: VariantSelection<V>
  compoundVariants?: CompoundVariants<V, S>
}

export type RuntimeFn<V extends BaseVariantGroups | SlotVariantGroups, R> = (
  styles: VariantSelection<V>,
  options?: { specifiedColorPalette?: string },
) => R

export type MultipleSerializedStyles<V> = {
  [K in keyof V]: SerializedStyles
}
