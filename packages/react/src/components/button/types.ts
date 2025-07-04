import type { ReactNode, ElementType, AnchorHTMLAttributes } from 'react'
import type { ClassValue } from 'clsx'
import type { ButtonVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProp,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

export interface ButtonPropsOverrides {}

type ButtonSlotProps<RootComponent extends ElementType> = {
  startIcon?: ComponentPropsWithCommonProps<
    'span',
    ButtonOwnerState<RootComponent>
  >
  endIcon?: ComponentPropsWithCommonProps<
    'span',
    ButtonOwnerState<RootComponent>
  >
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
  sx?: SxProp<ButtonOwnerState<RootComponent>>

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
  slotProps?: ButtonSlotProps<RootComponent>

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'startIcon' | 'endIcon'>

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

export type ButtonOwnerState<RootComponent extends ElementType = 'button'> =
  ButtonProps<RootComponent> & {
    variant: ButtonVariants['variant']
    size: ButtonVariants['size']
    radius: ButtonVariants['radius']
    color: ButtonVariants['color']
    iconOnly: boolean
    fullWidth: boolean
    disabled: boolean
    disableRipple: boolean
    loading: boolean
  }
