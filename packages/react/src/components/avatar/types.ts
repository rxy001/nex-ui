import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { AvatarVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProp,
  ComponentPropsWithCommonProps,
} from '../../types/utils'
import type { Avatar } from './Avatar'

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
  sx?: SxProp<AvatarOwnerState<RootComponent>>

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
   * Used to render icon or text elements inside the avatar if src is not set. This can be an element, or just a string.
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
   * The size of the avatar.
   * @default 'md'
   */
  size?: AvatarVariants['size']

  /**
   * The border radius of the avatar.
   * @default size
   */
  radius?: AvatarVariants['radius']

  /**
   * The color of the avatar.
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

export type LoadedState = false | 'error' | 'loaded'

export type AvatarOwnerState<RootComponent extends ElementType = 'div'> =
  AvatarProps<RootComponent> & {
    radius: AvatarVariants['radius']
    size: AvatarVariants['size']
    color: AvatarVariants['color']
    outlined: boolean
    inGroup: boolean
    loaded: LoadedState
  }

export type UseLoadedOptions = {
  src?: string
  srcSet?: string
}

export interface AvatarGroupPropsOverrides {}

type AvatarGroupSlotProps<RootComponent extends ElementType> = {
  surplus?: ComponentPropsWithCommonProps<
    typeof Avatar,
    AvatarGroupOwnerState<RootComponent>
  >
}

type AvatarGroupOwnProps<RootComponent extends ElementType = 'div'> = {
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<AvatarGroupOwnerState<RootComponent>>

  /**
   * The props used for each slot.
   */
  slotProps?: AvatarGroupSlotProps<RootComponent>

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'surplus'>

  /**
   * The size of the Avatars.
   * @default 'md'
   */
  size?: AvatarVariants['size']

  /**
   * The border radius of the Avatars
   * @default size
   */
  radius?: AvatarVariants['radius']

  /**
   * The color of the Avatars
   * @default 'gray'
   */
  color?: AvatarVariants['color']

  /**
   * If true, adds an outline around the avatars.
   * @default false
   * @default false
   */
  outlined?: boolean

  /**
   * Max avatars to show before +x.
   * @default 5
   */
  max?: number

  /**
   * 	The total number of avatars.
   */
  total?: number

  /**
   * Spacing between avatars.
   */
  spacing?: number

  /**
   * custom renderer of extraAvatars
   */
  renderSurplus?: (surplus: number) => ReactNode
}

export type AvatarGroupProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AvatarGroupOwnProps<RootComponent>,
    AvatarGroupPropsOverrides
  >

export type AvatarGroupOwnerState<RootComponent extends ElementType = 'div'> =
  AvatarGroupProps<RootComponent> & {
    radius: AvatarVariants['radius']
    size: AvatarVariants['size']
    color: AvatarVariants['color']
    outlined: boolean
    max: number
  }

export type AvatarGroupContextValue = {
  outlined: boolean
  color: AvatarVariants['color']
  radius: AvatarVariants['radius']
  size: AvatarVariants['size']
}
