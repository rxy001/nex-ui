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
