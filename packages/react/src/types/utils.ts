import type {
  CSSObject,
  RecipeRuntimeFn,
  SlotRecipeRuntimeFn,
} from '@nex-ui/system'
import type { ElementType, ComponentPropsWithRef } from 'react'
import type { ClassValue } from 'clsx'

export type UniteTokens<T extends {}, U extends {}> = {
  [K in keyof T]: K extends keyof U ? T[K] | U[K] : T[K]
}

export type SxProps<OwnerState extends object | void = void> =
  | CSSObject
  | CSSObject[]
  | (OwnerState extends void
      ? () => CSSObject | CSSObject[]
      : (ownerState: OwnerState) => CSSObject | CSSObject[])

export type ComponentUtilityClasses<T extends string> = Partial<
  Record<T, ClassValue>
>

export type Overwrite<K, T> = Omit<K, keyof T> & T

export type OverrideProps<
  Component extends ElementType,
  OwnProps = object,
  OverridesProps = object,
> = Overwrite<
  ComponentPropsWithRef<Component>,
  Overwrite<OwnProps, OverridesProps>
>

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
  ? DefineComponentRecipe<T, CSSObject>
  : T extends SlotRecipeRuntimeFn
    ? DefineComponentRecipe<
        T,
        {
          [K in T['slots'][number]]?: CSSObject
        }
      >
    : never

export type ComponentThemeFn<P, S> = (
  ownerState: P,
) => S extends SlotRecipeRuntimeFn
  ? {
      [K in S['slots'][number]]?: CSSObject
    }
  : S extends RecipeRuntimeFn
    ? CSSObject
    : never
