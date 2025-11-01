import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { Interpolation } from '@nex-ui/system'
import type {
  ComponentPropsWithCommonProps,
  ComponentSlotClasses,
  OverrideProps,
} from '../../types/utils'
import type { SwitchVariants } from '../../theme/recipes'

export interface SwitchPropsOverrides {}

type SwitchSlotProps = {
  root?: ComponentPropsWithCommonProps<'label'>
  track?: ComponentPropsWithCommonProps<'span'>
  startIcon?: ComponentPropsWithCommonProps<'span'>
  endIcon?: ComponentPropsWithCommonProps<'span'>
  thumb?: ComponentPropsWithCommonProps<'span'>
  label?: ComponentPropsWithCommonProps<'span'>
}

export type SwitchOwnProps<SwitchComponent extends ElementType> = {
  /**
   * The component or element to render as the input.
   *
   * @default 'input'
   */
  as?: SwitchComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The label of the Switch.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The element placed before the children.
   */
  startIcon?: ReactNode

  /**
   * The element placed after the children.
   */
  endIcon?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: SwitchSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof SwitchSlotProps>

  /**
   * The icon to display when the Switch is checked.
   */
  thumbIcon?:
    | ReactNode
    | ((ownerState: SwitchProps<SwitchComponent>) => ReactNode)

  /**
   * Handler that is called when the element's checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * If true, the Switch is checked.(controlled)
   */
  checked?: boolean

  /**
   * If true, the Switch is disabled.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The size of the Switch.
   *
   * @default 'md'
   */
  size?: SwitchVariants['size']

  /**
   * The color of the Switch.
   *
   * @default primaryThemeColor
   */
  color?: SwitchVariants['color']

  /**
   * The default checked state. (uncontrolled)
   *
   * @default false
   */
  defaultChecked?: boolean
}

export type SwitchProps<SwitchComponent extends ElementType = 'input'> =
  OverrideProps<
    SwitchComponent,
    SwitchOwnProps<SwitchComponent>,
    SwitchPropsOverrides
  >
