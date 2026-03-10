import type {
  CSSObject,
  RecipeRuntimeFn,
  SlotRecipeRuntimeFn,
  Interpolation,
} from '@nex-ui/system'
import type { ElementType, ComponentProps, JSX } from 'react'
import type { ClassValue } from 'clsx'

export type UniteTokens<T extends {}, U extends {}> = {
  [K in keyof T]: K extends keyof U ? T[K] | U[K] : T[K]
}

export type Overwrite<K, T> = Omit<K, keyof T> & T

export type SlotProps<
  T extends keyof JSX.IntrinsicElements,
  Props extends object = {},
> = Overwrite<
  JSX.IntrinsicElements[T],
  { className?: ClassValue; as?: ElementType; sx?: Interpolation } & Props
>

export type ComponentSlotClasses<T extends string> = Partial<
  Record<T, ClassValue>
>

export type OverrideProps<
  Component extends ElementType,
  OwnProps = object,
  OverridesProps = object,
> = Overwrite<ComponentProps<Component>, Overwrite<OwnProps, OverridesProps>>

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

export type Simplify<T> = {
  [K in keyof T]: T[K]
} & {}
