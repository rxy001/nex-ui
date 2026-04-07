import type { ReactNode, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { Interpolation } from '@nex-ui/system'
import type { InputVariants } from '../../themes/recipes'
import type {
  SlotProps,
  ComponentSlotClasses,
  OverrideProps,
} from '../../types/utils'

export interface InputPropsOverrides {}

interface InputSlotProps {
  root?: SlotProps<'div'>
  clearButton?: SlotProps<'button'>
  prefix?: SlotProps<'span'>
  suffix?: SlotProps<'span'>
  label?: SlotProps<'label'>
}

interface InputOwnProps<InputComponent extends ElementType> {
  /**
   * The component or element to render as the input.
   *
   * @default 'input'
   */
  as?: InputComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The label of the Input.
   */
  label?: ReactNode

  /**
   * The element placed before the input.
   */
  prefix?: ReactNode

  /**
   * The element placed after the input.
   */
  suffix?: ReactNode

  /**
   * Callback fired when the clear button is clicked.
   */
  onClear?: () => void

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * If true, disables the Input.
   * @default false
   */
  disabled?: boolean

  /**
   * If true, makes the Input take the full width of its parent.
   *
   * @default false
   */
  fullWidth?: boolean

  /**
   * If true, marks the Input as invalid.
   *
   * @default false
   */
  invalid?: boolean

  /**
   * If true, shows a clear button for the Input.
   *
   * @default false
   */
  clearable?: boolean

  /**
   * The size of the Input.
   *
   * @default 'md'
   */
  size?: InputVariants['size']

  /**
   * The color of the Input.
   *
   * @default primaryThemeColor
   */
  color?: InputVariants['color']

  /**
   * The border radius of the Input.
   *
   * @default 'md'
   */
  radius?: InputVariants['radius']

  /**
   * The Input appearance style.
   *
   * @default 'outlined'
   */
  variant?: InputVariants['variant']

  /**
   * The position of the label.
   */
  labelPlacement?: InputVariants['labelPlacement']

  /**
   * Callback fired when the value changes.
   */
  onValueChange?: (value: string) => void

  /**
   * The value of the Input. (controlled)
   */
  value?: string

  /**
   * The default value of the Input. (uncontrolled)
   */
  defaultValue?: string

  /**
   * The type of the input element.
   */
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | 'month'

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof InputSlotProps>

  /**
   * The props used for each slot.
   */
  slotProps?: InputSlotProps

  /**
   * If true, disables the animation for the Input.
   *
   * @default false
   */
  disableAnimation?: boolean
}

export type InputProps<InputComponent extends ElementType = 'input'> =
  OverrideProps<
    InputComponent,
    InputOwnProps<InputComponent>,
    InputPropsOverrides
  >
