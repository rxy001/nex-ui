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
  SlotProps,
} from '../../types/utils'

export interface CheckboxPropsOverrides {}

interface CheckboxSlotProps {
  root?: SlotProps<'label'>
  label?: SlotProps<'span'>
  icon?: SlotProps<'span'>
}

interface CheckboxOwnProps<CheckboxComponent extends ElementType> {
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
   * Callback fired when the checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * If true, checks the Checkbox. (controlled)
   */
  checked?: boolean

  /**
   * If true, disables the Checkbox.
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
   * The indeterminate state is purely visual. It remains regardless of user interaction.
   *
   * @default false
   */
  indeterminate?: boolean

  /**
   * If true, disables the animation when the checked state changes.
   *
   * @default false
   */
  disableAnimation?: boolean
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

interface CheckboxGroupSlotProps {
  label?: SlotProps<'h3'>
  wrapper?: SlotProps<'div'>
}

interface CheckboxGroupOwnProps<
  T extends number | string = number | string,
  RootComponent extends ElementType = 'div',
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
   * The props used for each slot.
   */
  slotProps?: CheckboxGroupSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof CheckboxGroupSlotProps>

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
   * Callback fired when the value changes.
   */
  onValueChange?: (value: T[]) => void

  /**
   * If true, disables all checkboxes in the group.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The color of all checkboxes in the group.
   */
  color?: CheckboxVariants['color']

  /**
   * The size of all checkboxes in the group.
   */
  size?: CheckboxVariants['size']

  /**
   * The border radius of all checkboxes in the group.
   */
  radius?: CheckboxVariants['radius']

  /**
   * The orientation of the CheckboxGroup.
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

  /**
   * If true, disables the animation for all Checkboxes in the group.
   *
   * @default false
   */
  disableAnimation?: boolean
}

export type CheckboxGroupProps<
  T extends number | string = number | string,
  RootComponent extends ElementType = 'div',
> = OverrideProps<
  RootComponent,
  CheckboxGroupOwnProps<T, RootComponent>,
  CheckboxGroupPropsOverrides
>
