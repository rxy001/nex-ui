import type { ReactNode, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { InputVariants } from '../../theme/recipes'
import type {
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
  OverrideProps,
  SxProp,
} from '../../types/utils'
import type { Button } from '../button'

export interface InputPropsOverrides {}

type InputSlotProps<InputComponent extends ElementType> = {
  root?: ComponentPropsWithCommonProps<'div', InputOwnerState<InputComponent>>
  clearButton?: ComponentPropsWithCommonProps<
    typeof Button<'button'>,
    InputOwnerState<InputComponent>
  >
  prefix?: ComponentPropsWithCommonProps<
    'span',
    InputOwnerState<InputComponent>
  >
  suffix?: ComponentPropsWithCommonProps<
    'span',
    InputOwnerState<InputComponent>
  >
  label?: ComponentPropsWithCommonProps<
    'label',
    InputOwnerState<InputComponent>
  >
}

type InputOwnProps<InputComponent extends ElementType> = {
  /**
   * The component used for the input element.
   * @default 'input'
   */
  as?: InputComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<InputOwnerState<InputComponent>>

  /**
   * The label of the input.
   */
  label?: ReactNode

  /**
   * The element is placed before the input.
   */
  prefix?: ReactNode

  /**
   * The element is placed after the input.
   */
  suffix?: ReactNode

  /**
   * Handler that is called when the clear button is clicked.
   */
  onClear?: () => void

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * If true, the input is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * If true, the input takes the full width of its parent.
   * @default false
   */
  fullWidth?: boolean

  /**
   * If true, the input is invalid.
   * @default false
   */
  invaild?: boolean

  /**
   * If true, the input is clearable.
   * @default false
   */
  clearable?: boolean

  /**
   * The size of the input.
   * @default 'md'
   */
  size?: InputVariants['size']

  /**
   * The color of the input.
   * @default primaryThemeColor
   */
  color?: InputVariants['color']

  /**
   * The border radius of the input.
   * @default size
   */
  radius?: InputVariants['radius']

  /**
   * The input appearance style.
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
   * The value of the input. (controlled)
   */
  value?: string

  /**
   * The default value of the input. (uncontrolled)
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
  classes?: ComponentUtilityClasses<
    'root' | 'label' | 'clearButton' | 'prefix' | 'suffix'
  >

  /**
   * The props used for each slot.
   */
  slotProps?: InputSlotProps<InputComponent>
}

export type InputProps<InputComponent extends ElementType = 'input'> =
  OverrideProps<
    InputComponent,
    InputOwnProps<InputComponent>,
    InputPropsOverrides
  >

export type InputOwnerState<InputComponent extends ElementType = 'input'> =
  InputProps<InputComponent> & {
    color: InputVariants['color']
    disabled: boolean
    variant: InputVariants['variant']
    fullWidth: boolean
    size: InputVariants['size']
    radius: InputVariants['radius']
    invaild: boolean
    type: InputProps['type']
    clearable: boolean
    value: string
  }
