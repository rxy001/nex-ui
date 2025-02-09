import type { ElementType } from 'react'
import type {
  OverrideProps,
  ComponentUtilityClasses,
  SxProps,
} from '../../types/utils'
import type { DividerVariants } from '../../theme/recipes'

export interface DividerPropsOverrides {}

type AvatarOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProps<AvatarOwnProps<RootComponent>>
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
