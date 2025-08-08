import type { ElementType } from 'react'
import type {
  OverrideProps,
  SxProp,
  ComponentUtilityClasses,
  ComponentPropsWithCommonProps,
} from '../../types/utils'
import type { RadioGroupVariants, RadioVariants } from '../../theme/recipes'

export type RadioValueType = string | number

type RadioSlotProps<RadioComponent extends ElementType> = {
  root?: ComponentPropsWithCommonProps<'label', RadioOwnerState<RadioComponent>>
  dot?: ComponentPropsWithCommonProps<'span', RadioOwnerState<RadioComponent>>
  label?: ComponentPropsWithCommonProps<'span', RadioOwnerState<RadioComponent>>
}

type RadioOwnProps<RadioComponent extends ElementType = 'input'> = {
  as?: RadioComponent

  sx?: SxProp<RadioOwnerState<RadioComponent>>

  className?: string

  disabled?: boolean

  name?: string

  value?: RadioValueType

  checked?: boolean

  defaultChecked?: boolean

  onCheckedChange?: (checked: boolean) => void

  size?: RadioVariants['size']

  color?: RadioVariants['color']

  classes?: ComponentUtilityClasses<'root' | 'input' | 'dot' | 'label'>

  slotProps?: RadioSlotProps<RadioComponent>
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

type RadioGroupOwnProps<
  T extends RadioValueType,
  RootComponent extends ElementType,
> = {
  as?: RootComponent

  className?: string

  disabled?: boolean

  name?: string

  value?: T

  defaultValue?: T

  onValueChange?: (value: T) => void

  size?: RadioVariants['size']

  color?: RadioVariants['color']

  orientation?: RadioGroupVariants['orientation']
}

export interface RadioGroupPropsOverrides {}

export type RadioGroupProps<
  T extends RadioValueType = RadioValueType,
  RootComponent extends ElementType = 'div',
> = OverrideProps<
  RootComponent,
  RadioGroupOwnProps<T, RootComponent>,
  RadioGroupPropsOverrides
>

export type RadioGroupOwnerState<
  T extends RadioValueType = RadioValueType,
  RootComponent extends ElementType = 'div',
> = RadioGroupProps<T, RootComponent>

export type RadioState = { value?: RadioValueType; disabled?: boolean }

export interface RadioGroupContextValue<
  T extends RadioValueType = RadioValueType,
> {
  setValue: (value: T) => void
  isChecked: (value?: T) => boolean
  isNullValue: () => boolean
  name?: string
  disabled?: boolean
  color?: RadioVariants['color']
  size?: RadioVariants['size']
  setGroupState: (radio: RadioState) => void
}
