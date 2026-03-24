import type { ReactNode, ElementType, AnchorHTMLAttributes } from 'react'
import type { ClassValue } from 'clsx'
import type { Interpolation } from '@nex-ui/system'
import type { ButtonVariants } from '../../theme/recipes'
import type {
  ComponentSlotClasses,
  OverrideProps,
  SlotProps,
} from '../../types/utils'

export interface ButtonPropsOverrides {}

interface ButtonSlotProps {
  startIcon?: SlotProps<'span'>
  endIcon?: SlotProps<'span'>
}

interface ButtonOwnProps<RootComponent extends ElementType> {
  /**
   * The component or element to render as the root.
   *
   * @default 'button'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The element placed before the children.
   */
  startIcon?: ReactNode

  /**
   * The element placed after the children.
   */
  endIcon?: ReactNode

  /**
   * Spinner to display when loading.
   */
  spinner?: ReactNode

  /**
   * The spinner placement.
   *
   * @default 'start'
   */
  spinnerPlacement?: 'start' | 'end'

  /**
   * The URL to link to when the Button is clicked. If defined, an anchor element will be used as the root node.
   */
  href?: string

  /**
   * The content of the Button.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * Specifies where to display the linked URL.
   */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']

  /**
   * The props used for each slot.
   */
  slotProps?: ButtonSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof ButtonSlotProps>

  /**
   * The Button appearance style.
   *
   * @default 'solid'
   */
  variant?: ButtonVariants['variant']

  /**
   * The size of the Button.
   *
   * @default 'md'
   */
  size?: ButtonVariants['size']

  /**
   * The border radius of the Button.
   *
   * @default size
   */
  radius?: ButtonVariants['radius']

  /**
   * The color of the Button.
   *
   * @default primaryThemeColor
   */
  color?: ButtonVariants['color']

  /**
   * If true, makes the Button square (equal width and height).
   *
   * @default false
   */
  iconOnly?: boolean

  /**
   * If true, makes the Button take the full width of its parent.
   *
   * @default false
   */
  fullWidth?: boolean

  /**
   * If true, disables the Button.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * If true, disables the ripple effect.
   *
   * @default false
   */
  disableRipple?: boolean

  /**
   * If true, shows the loading indicator and disables the Button.
   *
   * @default false
   */
  loading?: boolean

  /**
   * If true, disables the animation for the Button.
   *
   * @default false
   */
  disableAnimation?: boolean
}

export type ButtonProps<RootComponent extends ElementType = 'button'> =
  OverrideProps<
    RootComponent,
    ButtonOwnProps<RootComponent>,
    ButtonPropsOverrides
  >
