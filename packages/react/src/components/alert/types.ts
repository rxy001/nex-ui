import type { ElementType, ReactNode, MouseEventHandler } from 'react'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProp,
  ComponentPropsWithCommonProps,
} from '../../types/utils'
import type { Button } from '../button'
import type { AlertVariants } from '../../theme/recipes'

export interface AlertPropsOverrides {}

type AlertSlotProps<RootComponent extends ElementType> = {
  icon: ComponentPropsWithCommonProps<'div', AlertOwnerState<RootComponent>>
  content: ComponentPropsWithCommonProps<'div', AlertOwnerState<RootComponent>>
  title: ComponentPropsWithCommonProps<'div', AlertOwnerState<RootComponent>>
  description: ComponentPropsWithCommonProps<
    'div',
    AlertOwnerState<RootComponent>
  >
  closeButton: ComponentPropsWithCommonProps<
    typeof Button<'button'>,
    AlertOwnerState<RootComponent>
  >
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
  sx?: SxProp<AlertOwnerState<RootComponent>>

  /**
   * The props used for each slot.
   */
  slotProps?: AlertSlotProps<RootComponent>

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

export type AlertOwnerState<RootComponent extends ElementType = 'div'> =
  AlertProps<RootComponent> & {
    status: AlertStatus
    variant: AlertVariants['variant']
    color: AlertVariants['color']
    radius: AlertVariants['radius']
    icon: ReactNode
  }
