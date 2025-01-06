import type {
  StyleObject,
  RawCSSProperties,
  RecipeRuntimeFn,
  SlotRecipeRuntimeFn,
} from '@nex-ui/system'
import type { ElementType } from 'react'
import type { StyledComponentProps } from '@nex-ui/styled'

export type ClassNames = string | string[]

export type ComponentUtilityClasses<OwnerState, T extends string> = Partial<
  Record<T, ClassNames | ((ownerState: OwnerState) => ClassNames)>
>

export type Overwrite<K, T> = Omit<K, keyof T> & T

export type OverrideProps<
  Component extends ElementType,
  Props = NonNullable<unknown>,
  Overrides = NonNullable<unknown>,
> = StyledComponentProps<Component, Overwrite<Props, Overrides>>

export type CreateSlotProps<T> = {
  [K in keyof T]: T[K] & Pick<StyledComponentProps, 'sx'>
}

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

type DefineComponentRecipe<
  T extends RecipeRuntimeFn | SlotRecipeRuntimeFn,
  S,
  Q = Exclude<T['__config']['variants'], undefined>,
> = (T extends SlotRecipeRuntimeFn ? { slots?: S } : { base?: S }) & {
  variants?: {
    [V in keyof Q]?: {
      [K in keyof Q[V]]?: S
    } & {
      [K: string]: S
    }
  } & {
    [V: string]: {
      [K: string]: S
    }
  }
  compoundVariants?: Array<
    {
      [L in keyof Q]?: Array<BooleanMap<keyof Q[L]>> | BooleanMap<keyof Q[L]>
    } & {
      css?: S
    }
  >
}

export type ComponentThemeObject<T> = T extends RecipeRuntimeFn
  ? DefineComponentRecipe<T, StyleObject>
  : T extends SlotRecipeRuntimeFn
    ? DefineComponentRecipe<
        T,
        {
          [K in T['slots'][number]]?: StyleObject
        }
      >
    : never

export type ComponentThemeFn<P, S> = (
  ownerState: P,
) => S extends SlotRecipeRuntimeFn
  ? {
      [K in S['slots'][number]]?: StyleObject
    }
  : S extends RecipeRuntimeFn
    ? StyleObject
    : never

export type TokenDefinition<T, K> = {
  [V in keyof T]: K extends { [key: string]: infer A } ? A : never
} & K

export type ReplaceValuesWithColor<T> = {
  [K in keyof T]: Exclude<T[K], undefined> extends object
    ? ReplaceValuesWithColor<T[K]>
    : RawCSSProperties['color']
}
