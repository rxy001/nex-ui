import type { ElementType, ReactNode, MouseEventHandler } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  ComponentPropsWithCommonProps,
} from '../../types/utils'
import type { ButtonProps } from '../button'
import type { AlertVariants } from '../../theme/recipes'

export interface AlertPropsOverrides {}

type AlertSlotProps = {
  icon: ComponentPropsWithCommonProps<'div'>
  content: ComponentPropsWithCommonProps<'div'>
  title: ComponentPropsWithCommonProps<'div'>
  description: ComponentPropsWithCommonProps<'div'>
  closeButton: ButtonProps
}

type AlertStatus = 'info' | 'success' | 'warning' | 'error'

type AlertOwnProps<RootComponent extends ElementType> = {
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
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * The props used for each slot.
   */
  slotProps?: AlertSlotProps

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<
    'icon' | 'content' | 'title' | 'description' | 'closeButton'
  >

  /**
   * The variant of the alert.
   * @default 'faded'
   */
  variant?: AlertVariants['variant']

  /**
   * The color of the alert. It overrides the status color.
   */
  color?: AlertVariants['color']

  /**
   * The border radius of the alert.
   * @default 'md'
   */
  radius?: AlertVariants['radius']

  /**
   * The icon of the alert.
   */
  icon?: ReactNode

  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action?: ReactNode

  /**
   * The title of the alert.
   */
  title?: ReactNode

  /**
   * The description of the alert.
   */
  description?: ReactNode

  /**
   * If true, the alert end will show a close button.
   */
  closable?: boolean

  /**
   * Callback fired when the close button is clicked.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>

  /**
   * The status of the alert.
   * @default 'info'
   */
  status?: AlertStatus

  /**
   * If true, the alert will not display the icon.
   */
  hideIcon?: boolean
}

export type AlertProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AlertOwnProps<RootComponent>,
    AlertPropsOverrides
  >
