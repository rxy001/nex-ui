import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { AvatarVariants } from '../../theme/recipes'
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
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<AvatarOwnerState<RootComponent>>

  /**
   * Used in combination with src or srcSet to provide an alt attribute for the rendered img element.
   */
  alt?: string

  /**
   * If true, adds an outline around the avatar.
   * @default false
   */
  outlined?: boolean

  /**
   * The src attribute for the img element.
   */
  src?: string

  /**
   * The srcSet attribute for the img element.
   */
  srcSet?: string

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * Used to render icon or text elements inside the Avatar if src is not set. This can be an element, or just a string.
   */
  children?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: AvatarSlotProps<RootComponent>

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'img'>

  /**
   * The size of the Avatar.
   * @default 'md'
   */
  size?: AvatarVariants['size']

  /**
   * The border radius of the Avatar.
   * @default size
   */
  radius?: AvatarVariants['radius']

  /**
   * The color of the Avatar.
   * @default 'gray'
   */
  color?: AvatarVariants['color']
}

export type AvatarProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AvatarOwnProps<RootComponent>,
    AvatarPropsOverrides
  >

export type AvatarOwnerState<RootComponent extends ElementType = 'div'> =
  AvatarProps<RootComponent> & {
    radius: AvatarVariants['radius']
    size: AvatarVariants['size']
    color: AvatarVariants['color']
  }

export type UseLoadedOptions = {
  src?: string
  srcSet?: string
}
