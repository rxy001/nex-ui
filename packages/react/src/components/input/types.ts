import type { ReactNode, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { Interpolation } from '@nex-ui/system'
import type { InputVariants } from '../../theme/recipes'
import type {
  SlotProps,
  ComponentSlotClasses,
  OverrideProps,
} from '../../types/utils'

export interface InputPropsOverrides {}

type InputSlotProps = {
  root?: SlotProps<'div'>
  clearButton?: SlotProps<'button'>
  prefix?: SlotProps<'span'>
  suffix?: SlotProps<'span'>
  label?: SlotProps<'label'>
}

type InputOwnProps<InputComponent extends ElementType> = {
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
   * Handler that is called when the clear button is clicked.
   */
  onClear?: () => void

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * If true, the input is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * If true, the Input takes the full width of its parent.
   *
   * @default false
   */
  fullWidth?: boolean

  /**
   * If true, the Input is invalid.
   *
   * @default false
   */
  invalid?: boolean

  /**
   * If true, the Input is clearable.
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
   * @default size
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
   * Handler that is called when the element's value changes.
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
