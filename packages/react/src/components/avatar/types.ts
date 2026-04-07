import type { ElementType, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { AvatarVariants } from '../../themes/recipes'
import type {
  ComponentSlotClasses,
  OverrideProps,
  SlotProps,
} from '../../types/utils'

export interface AvatarPropsOverrides {}

interface AvatarSlotProps {
  img?: SlotProps<'img'>
}

interface AvatarOwnProps<RootComponent extends ElementType> {
  /**
   * The component or element to render as the root.
   *
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
   * If true, adds an outline around the Avatar.
   *
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
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * Renders icon or text content inside the Avatar when `src` is not provided. This can be a React element or a plain string.
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
   * The size of the Avatar.
   *
   * @default 'md'
   */
  size?: AvatarVariants['size']

  /**
   * The border radius of the Avatar.
   *
   * @default 'md'
   */
  radius?: AvatarVariants['radius']

  /**
   * The color of the Avatar.
   *
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

export interface AvatarOwnerState extends AvatarProps {
  inGroup: boolean
  disableAnimation: boolean
}

export interface UseLoadedOptions {
  src?: string
  srcSet?: string
}

export interface AvatarGroupPropsOverrides {}

interface AvatarGroupSlotProps {
  surplus?: AvatarProps
}

interface AvatarGroupOwnProps<RootComponent extends ElementType = 'div'> {
  /**
   * The component or element to render as the root.
   *
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
  classNames?: ComponentSlotClasses<keyof AvatarGroupSlotProps>

  /**
   * The size of all Avatars in the group.
   *
   * @default 'md'
   */
  size?: AvatarVariants['size']

  /**
   * The border radius of all Avatars in the group.
   *
   * @default 'md'
   */
  radius?: AvatarVariants['radius']

  /**
   * The color of all Avatars in the group.
   *
   * @default 'gray'
   */
  color?: AvatarVariants['color']

  /**
   * If true, adds an outline around all Avatars in the group.
   *
   * @default false
   */
  outlined?: boolean

  /**
   * Maximum number of Avatars to show before displaying the +x surplus indicator.
   *
   * @default 5
   */
  max?: number

  /**
   * The total number of Avatars.
   */
  total?: number

  /**
   * Spacing between Avatars.
   */
  spacing?: number | string

  /**
   * Custom renderer for surplus Avatars. Receives the surplus count based on children and max.
   */
  renderSurplus?: (surplus: number) => ReactNode

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * If true, disables the animation when hovering Avatar.
   *
   * @default false
   */
  disableAnimation?: boolean
}

export type AvatarGroupProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AvatarGroupOwnProps<RootComponent>,
    AvatarGroupPropsOverrides
  >
