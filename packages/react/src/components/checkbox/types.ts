import type { ReactNode, ElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { CheckboxVariants } from '../../theme/recipes'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProp,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

export interface CheckboxPropsOverrides {}

type CheckboxSlotProps<CheckboxComponent extends ElementType> = {
  root?: ComponentPropsWithCommonProps<
    'label',
    CheckboxOwnerState<CheckboxComponent>
  >
  label?: ComponentPropsWithCommonProps<
    'span',
    CheckboxOwnerState<CheckboxComponent>
  >
  icon?: ComponentPropsWithCommonProps<
    'span',
    CheckboxOwnerState<CheckboxComponent>
  >
}

type CheckboxOwnProps<CheckboxComponent extends ElementType> = {
  /**
   * The component used for the input element.
   * @default 'input'
   */
  as?: CheckboxComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<CheckboxOwnerState<CheckboxComponent>>

  /**
   * The label of the checkbox.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * The icon to be displayed when the checkbox is checked.
   */
  icon?:
    | ReactNode
    | ((ownerState: CheckboxOwnerState<CheckboxComponent>) => ReactNode)

  /**
   * The props used for each slot.
   */
  slotProps?: CheckboxSlotProps<CheckboxComponent>

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'root' | 'label' | 'icon' | 'input'>

  /**
   * The default checked state.(uncontrolled)
   * @default false
   */
  defaultChecked?: boolean

  /**
   * The value of the checkbox.
   */
  value?: string | number

  /**
   * Handler that is called when the element's checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * If true, the checkbox is checked.(controlled)
   */
  checked?: boolean

  /**
   * If true, the checkbox is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * The color of the checkbox.
   * @default primaryThemeColor
   */
  color?: CheckboxVariants['color']

  /**
   * The size of the checkbox.
   * @default 'md'
   */
  size?: CheckboxVariants['size']

  /**
   * The border radius of the checkbox.
   * @default size
   */
  radius?: CheckboxVariants['radius']

  /**
   * If true, the checkbox appears indeterminate.
   * @default false
   */
  indeterminate?: boolean
}

export type CheckboxProps<CheckboxComponent extends ElementType = 'input'> =
  OverrideProps<
    CheckboxComponent,
    CheckboxOwnProps<CheckboxComponent>,
    CheckboxPropsOverrides
  >

export type CheckboxOwnerState<
  CheckboxComponent extends ElementType = 'input',
> = CheckboxProps<CheckboxComponent> & {
  checked: boolean
  disabled: boolean
  color: CheckboxVariants['color']
  size: CheckboxVariants['size']
  radius: CheckboxVariants['radius']
  defaultChecked: boolean
  inGroup: boolean
}

export interface CheckboxGroupPropsOverrides {}

type CheckboxGroupOwnProps<
  T extends number | string = number | string,
  CheckboxGroupComponent extends ElementType = 'div',
> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: CheckboxGroupComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<CheckboxGroupOwnerState<T, CheckboxGroupComponent>>

  /**
   * The current selected values. (controlled)
   */
  value?: T[]

  /**
   * The name of the checkbox group, used when submitting an HTML form.
   */
  name?: string

  /**
   * The checkboxes items.
   */
  children?: ReactNode

  /**
   * The default checked values. (uncontrolled)
   */
  defaultValue?: T[]

  /**
   * Handler that is called when the value changes.
   */
  onValueChange?: (value: T[]) => void

  /**
   * If true, the checkboxes are disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * The color of the checkboxes.
   */
  color?: CheckboxVariants['color']

  /**
   * The size of the checkboxes.
   */
  size?: CheckboxVariants['size']

  /**
   * The border radius of the checkboxes.
   */
  radius?: CheckboxVariants['radius']

  /**
   * The axis the checkbox group items should align with.
   * @default 'horizontal'
   */
  orientation?: 'vertical' | 'horizontal'
}

export type CheckboxGroupProps<
  T extends number | string = number | string,
  CheckboxGroupComponent extends ElementType = 'div',
> = OverrideProps<
  CheckboxGroupComponent,
  CheckboxGroupOwnProps<T, CheckboxGroupComponent>,
  CheckboxGroupPropsOverrides
>

export type CheckboxGroupOwnerState<
  T extends number | string = number | string,
  CheckboxGroupComponent extends ElementType = 'div',
> = CheckboxGroupProps<T, CheckboxGroupComponent> & {
  value: T[]
}

export type CheckboxGroupContextValue<
  T extends number | string = number | string,
> = {
  toggleValue: (value: T) => void
  isChecked: (value?: T) => boolean
  name?: string
  disabled?: boolean
  color?: CheckboxVariants['color']
  size?: CheckboxVariants['size']
  radius?: CheckboxVariants['radius']
}
