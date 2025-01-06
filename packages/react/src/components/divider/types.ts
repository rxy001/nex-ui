import type { ElementType } from 'react'
import type { OverrideProps, ComponentUtilityClasses } from '../../types/utils'
import type { DividerVariants } from '../../theme/recipes'

export interface DividerPropsOverrides {}

type AvatarOwnProps<RootComponent extends ElementType> = {
  classes?: ComponentUtilityClasses<DividerOwnerState<RootComponent>, 'root'>
} & DividerVariants

export type DividerProps<RootComponent extends ElementType = 'hr'> =
  OverrideProps<
    RootComponent,
    AvatarOwnProps<RootComponent>,
    DividerPropsOverrides
  >

export type DividerOwnerState<RootComponent extends ElementType = 'hr'> =
  DividerProps<RootComponent>
