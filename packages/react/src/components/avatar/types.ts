import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { AvatarVariants } from '../../theme/slotRecipes'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProps,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

export interface AvatarPropsOverrides {}

type AvatarSlotProps<RootComponent extends ElementType> = {
  img?: ComponentPropsWithCommonProps<'img', AvatarOwnerState<RootComponent>>
}

type AvatarOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProps<AvatarOwnerState<RootComponent>>
  alt?: string
  src?: string
  srcSet?: string
  className?: ClassValue
  children?: ReactNode
  slotProps?: AvatarSlotProps<RootComponent>
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
