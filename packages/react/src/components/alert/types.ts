import type { ElementType, ReactNode, MouseEventHandler } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type {
  ComponentSlotClasses,
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
   *
   * @default 'div'
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
   * The props used for each slot.
   */
  slotProps?: AlertSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof AlertSlotProps>

  /**
   * The Alert appearance style.
   *
   * @default 'faded'
   */
  variant?: AlertVariants['variant']

  /**
   * The color of the Alert. It overrides the status color.
   */
  color?: AlertVariants['color']

  /**
   * The border radius of the Alert.
   *
   * @default 'md'
   */
  radius?: AlertVariants['radius']

  /**
   * The icon element of the Alert.
   */
  icon?: ReactNode

  /**
   * The action element to display. Renders after the message, at the end of the Alert.
   */
  action?: ReactNode

  /**
   * The title of the Alert.
   */
  title?: ReactNode

  /**
   * The description of the Alert.
   */
  description?: ReactNode

  /**
   * If true, shows a close button at the end of the Alert.
   */
  closable?: boolean

  /**
   * Callback fired when the close button is clicked.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>

  /**
   * The status of the Alert.
   *
   * @default 'info'
   */
  status?: AlertStatus

  /**
   * If true, the Alert does not display the icon.
   */
  hideIcon?: boolean
}

export type AlertProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AlertOwnProps<RootComponent>,
    AlertPropsOverrides
  >
