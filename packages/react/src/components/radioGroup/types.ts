import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type { Interpolation } from '@nex-ui/system'
import type {
  OverrideProps,
  ComponentSlotClasses,
  SlotProps,
} from '../../types/utils'
import type { RadioGroupVariants, RadioVariants } from '../../themes/recipes'

interface RadioSlotProps {
  root?: SlotProps<'label'>
  indicator?: SlotProps<'span'>
  label?: SlotProps<'span'>
}

interface RadioOwnProps<RadioComponent extends ElementType = 'input'> {
  /**
   * The component or element to render as the input.
   *
   * @default 'input'
   */
  as?: RadioComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The label of the Radio.
   */
  children?: ReactNode

  /**
   * If true, disables the Radio.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The value of the Radio.
   */
  value?: string | number

  /**
   * If true, checks the Radio. (controlled)
   */
  checked?: boolean

  /**
   * If true, checks the Radio by default. (uncontrolled)
   */
  defaultChecked?: boolean

  /**
   * Callback fired when the checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * The size of the Radio.
   *
   * @default 'md'
   */
  size?: RadioVariants['size']

  /**
   * The color of the Radio.
   *
   * @default primaryThemeColor
   */
  color?: RadioVariants['color']

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof RadioSlotProps>

  /**
   * The props used for each slot.
   */
  slotProps?: RadioSlotProps

  /**
   * If true, disables the Radio animation.
   *
   * @default false
   */
  disableAnimation?: boolean
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

interface RadioGroupSlotProps {
  label?: SlotProps<'h3'>
  wrapper?: SlotProps<'div'>
}

interface RadioGroupOwnProps<
  T extends string | number,
  RootComponent extends ElementType,
> {
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
  slotProps?: RadioGroupSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof RadioGroupSlotProps>

  /**
   * If true, disables all Radios in the group.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The name of the RadioGroup, used when submitting an HTML form.
   */
  name?: string

  /**
   * The currently selected value. (controlled)
   */
  value?: T

  /**
   * The default selected value. (uncontrolled)
   */
  defaultValue?: T

  /**
   * Callback fired when the value changes.
   */
  onValueChange?: (value: T) => void

  /**
   * The size of all Radios in the group.
   */
  size?: RadioVariants['size']

  /**
   * The color of all Radios in the group.
   */
  color?: RadioVariants['color']

  /**
   * The orientation of the RadioGroup.
   *
   * @default 'horizontal'
   */
  orientation?: RadioGroupVariants['orientation']

  /**
   * The label of the RadioGroup.
   */
  label?: ReactNode

  /**
   * If true, disables all radio animation.
   *
   * @default false
   */
  disableAnimation?: boolean
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
