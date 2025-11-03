import type { ElementType, MouseEvent, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { Interpolation } from '@nex-ui/system'
import type {
  OverrideProps,
  ComponentPropsWithCommonProps,
  ComponentSlotClasses,
} from '../../types/utils'
import type { BadgeVariants } from '../../theme/recipes'

type BadgeSlotProps = {
  closeButton: ComponentPropsWithCommonProps<'button'>
  startIcon: ComponentPropsWithCommonProps<'span'>
  endIcon: ComponentPropsWithCommonProps<'span'>
}

type BadgeOwnProps<RootComponent extends ElementType> = {
  /**
   * The component or element to render as the root.
   *
   * @default 'span'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The border radius of the Badge.
   *
   * @default size
   */
  radius?: BadgeVariants['radius']

  /**
   * The size of the Badge.
   *
   * @default 'md'
   */
  size?: BadgeVariants['size']

  /**
   * The Badge appearance style.
   *
   * @default 'solid'
   */
  variant?: BadgeVariants['variant']

  /**
   * The color of the Badge.
   *
   * @default primaryThemeColor
   */
  color?: BadgeVariants['color']

  /**
   * If true, shows a close button at the end of the Badge.
   *
   * @default false
   */
  closable?: boolean

  /**
   * Callback fired when the close button is clicked.
   */
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void

  /**
   * If true, the Badge is disabled.
   */
  disabled?: boolean

  /**
   * The element is placed before the children.
   */
  startIcon?: ReactNode

  /**
   * The element is placed after the children.
   */
  endIcon?: ReactNode

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof BadgeSlotProps>

  /**
   * The props used for each slot.
   */
  slotProps?: BadgeSlotProps
}

export interface BadgePropsOverrides {}

export type BadgeProps<RootComponent extends ElementType = 'span'> =
  OverrideProps<
    RootComponent,
    BadgeOwnProps<RootComponent>,
    BadgePropsOverrides
  >
