import type { ElementType, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { AvatarVariants } from '../../theme/recipes'
import type {
  ComponentSlotClasses,
  OverrideProps,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

export interface AvatarPropsOverrides {}

type AvatarSlotProps = {
  img?: ComponentPropsWithCommonProps<'img'>
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
  sx?: Interpolation

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
  slotProps?: AvatarSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof AvatarSlotProps>

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
    inGroup: boolean
    loaded: LoadedState
  }

export type UseLoadedOptions = {
  src?: string
  srcSet?: string
}

export interface AvatarGroupPropsOverrides {}

type AvatarGroupSlotProps = {
  surplus?: AvatarProps
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
  sx?: Interpolation

  /**
   * The props used for each slot.
   */
  slotProps?: AvatarGroupSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<'surplus'>

  /**
   * The size of all Avatars.
   * @default 'md'
   */
  size?: AvatarVariants['size']

  /**
   * The border radius of all Avatars
   * @default size
   */
  radius?: AvatarVariants['radius']

  /**
   * The color of all Avatars
   * @default 'gray'
   */
  color?: AvatarVariants['color']

  /**
   * If true, adds an outline around all avatars.
   * @default false
   */
  outlined?: boolean

  /**
   * Max avatars to show before +x.
   * @default 5
   */
  max?: number

  /**
   * The total number of avatars.
   */
  total?: number

  /**
   * Spacing between avatars.
   */
  spacing?: number

  /**
   * Custom renderer of extraAvatars.
   */
  renderSurplus?: (surplus: number) => ReactNode

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue
}

export type AvatarGroupProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AvatarGroupOwnProps<RootComponent>,
    AvatarGroupPropsOverrides
  >

export type AvatarGroupContextValue = {
  outlined: boolean
  color: AvatarVariants['color']
  radius: AvatarVariants['radius']
  size: AvatarVariants['size']
}
