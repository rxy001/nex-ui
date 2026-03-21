import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { Interpolation } from '@nex-ui/system'
import type {
  SlotProps,
  ComponentSlotClasses,
  OverrideProps,
} from '../../types/utils'
import type { SwitchVariants } from '../../theme/recipes'

export interface SwitchPropsOverrides {}

type SwitchSlotProps = {
  root?: SlotProps<'label'>
  track?: SlotProps<'span'>
  startIcon?: SlotProps<'span'>
  endIcon?: SlotProps<'span'>
  thumb?: SlotProps<'span'>
  label?: SlotProps<'span'>
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
   * Callback fired when the checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * If true, checks the Switch. (controlled)
   */
  checked?: boolean

  /**
   * If true, disables the Switch.
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
   * If true, checks the Switch by default. (uncontrolled)
   *
   * @default false
   */
  defaultChecked?: boolean

  /**
   * If true, disables the animation for the Switch.
   *
   * @default false
   */
  disableAnimation?: boolean
}

export type SwitchProps<SwitchComponent extends ElementType = 'input'> =
  OverrideProps<
    SwitchComponent,
    SwitchOwnProps<SwitchComponent>,
    SwitchPropsOverrides
  >
