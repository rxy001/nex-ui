import type { ElementType, ReactNode, ComponentPropsWithRef } from 'react'
import type { AvatarVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  CreateSlotProps,
  OverrideProps,
} from '../types'

export interface AvatarPropsOverrides {}

type AvatarSlotProps = CreateSlotProps<{
  img?: ComponentPropsWithRef<'img'>
}>

type AvatarOwnProps<RootComponent extends ElementType> = {
  alt?: string
  src?: string
  srcSet?: string
  children?: ReactNode
  classes?: ComponentUtilityClasses<
    AvatarOwnerState<RootComponent>,
    'root' | 'img'
  >
  slotProps?: AvatarSlotProps
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
