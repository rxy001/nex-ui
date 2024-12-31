import type { ElementType, ComponentPropsWithRef } from 'react'
import type { StyleObject } from '@nex-ui/system'

export type ClassNames = string | string[]

export type ComponentUtilityClasses<OwnerState, T extends string> = Partial<
  Record<T, ClassNames | ((ownerState: OwnerState) => ClassNames)>
>

export type CommonProps<Component extends ElementType = ElementType> = {
  as?: Component
  sx?: StyleObject | StyleObject[]
}

export type Overwrite<K, T> = Omit<K, keyof T> & T

export type OverrideProps<
  Component extends ElementType,
  Props = NonNullable<unknown>,
  Overrides = NonNullable<unknown>,
> = Overwrite<
  ComponentPropsWithRef<Component>,
  Overwrite<Props, Overrides> & CommonProps<Component>
>
