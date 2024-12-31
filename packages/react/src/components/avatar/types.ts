import type { ElementType, ReactNode } from 'react'
import type { AvatarVariants, AvatarSlots } from '../../theme/recipes'
import type { ComponentUtilityClasses, OverrideProps } from '../types'

export interface AvatarPropsOverrides {}

type AvatarOwnProps<RootComponent extends ElementType> = {
  alt?: string
  src?: string
  srcSet?: string
  children?: ReactNode
  classes?: ComponentUtilityClasses<
    AvatarOwnerState<RootComponent>,
    AvatarSlots
  >
} & AvatarVariants

export type AvatarProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AvatarOwnProps<RootComponent>,
    AvatarPropsOverrides
  >

export type AvatarOwnerState<RootComponent extends ElementType = 'div'> =
  AvatarProps<RootComponent>

export type UseLoadedOptions = {
  src?: string
  srcSet?: string
}
