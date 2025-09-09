import type { ElementType, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type {
  OverrideProps,
  ComponentUtilityClasses,
  ComponentPropsWithCommonProps,
} from '../../types/utils'
import type { RadioGroupVariants, RadioVariants } from '../../theme/recipes'

type RadioSlotProps = {
  root?: ComponentPropsWithCommonProps<'label'>
  dot?: ComponentPropsWithCommonProps<'span'>
  label?: ComponentPropsWithCommonProps<'span'>
}

type RadioOwnProps<RadioComponent extends ElementType = 'input'> = {
  /**
   * The component used for the input element.
   * @default 'input'
   */
  as?: RadioComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root element.
   */
  className?: string

  /**
   * The label of the radio.
   */
  children?: ReactNode

  /**
   * If true, the radio is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * The value of the radio.
   */
  value?: string | number

  /**
   * If true, the radio is checked.(controlled)
   */
  checked?: boolean

  /**
   * If true, the radio is checked by default.
   */
  defaultChecked?: boolean

  /**
   * Handler that is called when the element's checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * The size of the radio.
   * @default 'md'
   */
  size?: RadioVariants['size']

  /**
   * The color of the radio.
   * @default primaryThemeColor
   */
  color?: RadioVariants['color']

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'root' | 'dot' | 'label'>

  /**
   * The props used for each slot.
   */
  slotProps?: RadioSlotProps
}

export interface RadioPropsOverrides {}

export type RadioProps<RadioComponent extends ElementType = 'input'> =
  OverrideProps<
    RadioComponent,
    RadioOwnProps<RadioComponent>,
    RadioPropsOverrides
  >

export type RadioOwnerState<RadioComponent extends ElementType = 'input'> =
  RadioProps<RadioComponent> & {
    inGroup: boolean
  }

type RadioGroupSlotProps = {
  label?: ComponentPropsWithCommonProps<'h3'>
  wrapper?: ComponentPropsWithCommonProps<'div'>
}

type RadioGroupOwnProps<
  T extends string | number,
  RootComponent extends ElementType,
> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The props used for each slot.
   */
  slotProps?: RadioGroupSlotProps

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'label' | 'wrapper'>

  /**
   * If true, the radios are disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * The name of the radio group, used when submitting an HTML form.
   */
  name?: string

  /**
   * The current selected value. (controlled)
   */
  value?: T

  /**
   * The default selected value. (uncontrolled)
   */
  defaultValue?: T

  /**
   * Handler that is called when the value changes.
   */
  onValueChange?: (value: T) => void

  /**
   * The size of the radios.
   */
  size?: RadioVariants['size']

  /**
   * The color of the radios.
   */
  color?: RadioVariants['color']

  /**
   * The orientation of the radio group.
   * @default 'horizontal'
   */
  orientation?: RadioGroupVariants['orientation']

  /**
   * The label of the radio group.
   */
  label?: ReactNode
}

export interface RadioGroupPropsOverrides {}

export type RadioGroupProps<
  T extends string | number = string | number,
  RootComponent extends ElementType = 'div',
> = OverrideProps<
  RootComponent,
  RadioGroupOwnProps<T, RootComponent>,
  RadioGroupPropsOverrides
>

export type RadioState = { value?: string | number; disabled?: boolean }

export interface RadioGroupContextValue<
  T extends string | number = string | number,
> {
  setValue: (value: T) => void
  isChecked: (value?: T) => boolean
  isTabbable: (value?: T) => boolean
  name?: string
  disabled?: boolean
  color?: RadioVariants['color']
  size?: RadioVariants['size']
  setGroupState: (radio: RadioState) => void
}
