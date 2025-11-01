import type { ReactNode, ElementType } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type {
  CheckboxVariants,
  CheckboxGroupVariants,
} from '../../theme/recipes'
import type {
  ComponentSlotClasses,
  OverrideProps,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

export interface CheckboxPropsOverrides {}

type CheckboxSlotProps = {
  root?: ComponentPropsWithCommonProps<'label'>
  label?: ComponentPropsWithCommonProps<'span'>
  icon?: ComponentPropsWithCommonProps<'span'>
}

type CheckboxOwnProps<CheckboxComponent extends ElementType> = {
  /**
   * The component or element to render as the input.
   *
   * @default 'input'
   */
  as?: CheckboxComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The label of the Checkbox.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The icon to display when the Checkbox is checked.
   */
  icon?:
    | ReactNode
    | ((ownerState: CheckboxOwnerState<CheckboxComponent>) => ReactNode)

  /**
   * The props used for each slot.
   */
  slotProps?: CheckboxSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof CheckboxSlotProps>

  /**
   * The default checked state. (uncontrolled)
   *
   * @default false
   */
  defaultChecked?: boolean

  /**
   * The value of the Checkbox.
   */
  value?: string | number

  /**
   * Handler that is called when the element's checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * If true, the Checkbox is checked. (controlled)
   */
  checked?: boolean

  /**
   * If true, the Checkbox is disabled.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The color of the Checkbox.
   *
   * @default primaryThemeColor
   */
  color?: CheckboxVariants['color']

  /**
   * The size of the Checkbox.
   *
   * @default 'md'
   */
  size?: CheckboxVariants['size']

  /**
   * The border radius of the Checkbox.
   *
   * @default size
   */
  radius?: CheckboxVariants['radius']

  /**
   * Indeterminate is presentational only. The indeterminate visual state remains regardless of user interaction.
   *
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
  inGroup: boolean
}

export interface CheckboxGroupPropsOverrides {}

type CheckboxGroupSlotProps = {
  label?: ComponentPropsWithCommonProps<'h3'>
  wrapper?: ComponentPropsWithCommonProps<'div'>
}

type CheckboxGroupOwnProps<
  T extends number | string = number | string,
  RootComponent extends ElementType = 'div',
> = {
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
   * The props used for each slot.
   */
  slotProps?: CheckboxGroupSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<'label' | 'wrapper'>

  /**
   * The currently selected values. (controlled)
   */
  value?: T[]

  /**
   * The name of the CheckboxGroup, used when submitting an HTML form.
   */
  name?: string

  /**
   * The list of Checkbox items.
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
   * If true, all checkboxes are disabled.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The color of all checkboxes.
   */
  color?: CheckboxVariants['color']

  /**
   * The size of all checkboxes.
   */
  size?: CheckboxVariants['size']

  /**
   * The border radius of all checkboxes.
   */
  radius?: CheckboxVariants['radius']

  /**
   * The axis the CheckboxGroup items should align with.
   *
   * @default 'horizontal'
   */
  orientation?: CheckboxGroupVariants['orientation']

  /**
   * The label of the CheckboxGroup.
   */
  label?: ReactNode

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
}

export type CheckboxGroupProps<
  T extends number | string = number | string,
  RootComponent extends ElementType = 'div',
> = OverrideProps<
  RootComponent,
  CheckboxGroupOwnProps<T, RootComponent>,
  CheckboxGroupPropsOverrides
>

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
