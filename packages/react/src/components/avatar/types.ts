import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react'
import type { AvatarVariants } from '../../theme/slotRecipes'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProps,
} from '../../types/utils'

export interface AvatarPropsOverrides {}

type AvatarSlotProps = {
  img?: ComponentPropsWithRef<'img'>
}

type AvatarOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProps<AvatarOwnerState<RootComponent>>
  alt?: string
  src?: string
  srcSet?: string
  className?: string
  children?: ReactNode
  slotProps?: AvatarSlotProps
  classes?: ComponentUtilityClasses<'img'>
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
