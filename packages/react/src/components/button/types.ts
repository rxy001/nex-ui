import type { ReactNode, ElementType, AnchorHTMLAttributes } from 'react'
import type { ClassValue } from 'clsx'
import type { Interpolation } from '@nex-ui/system'
import type { ButtonVariants } from '../../theme/recipes'
import type {
  ComponentSlotClasses,
  OverrideProps,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

export interface ButtonPropsOverrides {}

type ButtonSlotProps = {
  startIcon?: ComponentPropsWithCommonProps<'span'>
  endIcon?: ComponentPropsWithCommonProps<'span'>
}

type ButtonOwnProps<RootComponent extends ElementType> = {
  /**
   * The component or element to render as the root.
   * @default 'button'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The element is placed before the children.
   */
  startIcon?: ReactNode

  /**
   * The element is placed after the children.
   */
  endIcon?: ReactNode

  /**
   * Spinner to display when loading.
   */
  spinner?: ReactNode

  /**
   * The spinner placement.
   * @default 'start'
   */
  spinnerPlacement?: 'start' | 'end'

  /**
   * The URL to link to when the button is clicked. If defined, an a element will be used as the root node.
   */
  href?: string

  /**
   * The content of the button.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root element.
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
  classNames?: ComponentSlotClasses<'startIcon' | 'endIcon'>

  /**
   * The button appearance style.
   * @default 'solid'
   */
  variant?: ButtonVariants['variant']

  /**
   * The size of the button.
   * @default 'md'
   */
  size?: ButtonVariants['size']

  /**
   * The border radius of the button.
   * @default size
   */
  radius?: ButtonVariants['radius']

  /**
   * The color of the button.
   * @default primaryThemeColor
   */
  color?: ButtonVariants['color']

  /**
   * If true, the button has the same width and height.
   * @default false
   */
  iconOnly?: boolean

  /**
   * If true, the button takes the full width of its parent.
   * @default false
   */
  fullWidth?: boolean

  /**
   * If true, the button is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * If true, the ripple effect is disabled.
   * @default false
   */
  disableRipple?: boolean

  /**
   * If true, the loading indicator is visible and the button is disabled.
   * @default false
   */
  loading?: boolean
}

export type ButtonProps<RootComponent extends ElementType = 'button'> =
  OverrideProps<
    RootComponent,
    ButtonOwnProps<RootComponent>,
    ButtonPropsOverrides
  >
