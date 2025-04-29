import type { ElementType, ReactNode } from 'react'
import type { ClassValue } from 'clsx'
import type {
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
  OverrideProps,
  SxProps,
} from '../../types/utils'
import type { SwitchVariants } from '../../theme/recipes'

export interface SwitchPropsOverrides {}

type SwitchSlotProps<SwitchComponent extends ElementType> = {
  root?: ComponentPropsWithCommonProps<
    'label',
    SwitchOwnerState<SwitchComponent>
  >
  track?: ComponentPropsWithCommonProps<
    'span',
    SwitchOwnerState<SwitchComponent>
  >
  startIcon?: ComponentPropsWithCommonProps<
    'span',
    SwitchOwnerState<SwitchComponent>
  >
  endIcon?: ComponentPropsWithCommonProps<
    'span',
    SwitchOwnerState<SwitchComponent>
  >
  thumb?: ComponentPropsWithCommonProps<
    'span',
    SwitchOwnerState<SwitchComponent>
  >
  label?: ComponentPropsWithCommonProps<
    'span',
    SwitchOwnerState<SwitchComponent>
  >
}

export type SwitchOwnProps<SwitchComponent extends ElementType> = {
  /**
   * The component used for the input element.
   * @default 'input'
   */
  as?: SwitchComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<SwitchOwnerState<SwitchComponent>>

  /**
   * The label of the switch.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root element.
   */
  className?: ClassValue

  /**
   * The element is placed before the children.
   */
  startIcon?: ReactNode

  /**
   * The element is placed after the children.
   */
  endIcon?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: SwitchSlotProps<SwitchComponent>

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<
    'root' | 'track' | 'startIcon' | 'endIcon' | 'thumb' | 'label'
  >

  /**
   * The icon to be displayed when the switch is checked.
   */
  thumbIcon?:
    | ReactNode
    | ((ownerState: SwitchOwnerState<SwitchComponent>) => ReactNode)

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
   * The size of the switch.
   * @default 'md'
   */
  size?: SwitchVariants['size']

  /**
   * The color of the switch.
   * @default primaryColor
   */
  color?: SwitchVariants['color']

  /**
   * The default checked state.(uncontrolled)
   * @default false
   */
  defaultChecked?: boolean
}

export type SwitchProps<SwitchComponent extends ElementType = 'input'> =
  OverrideProps<
    SwitchComponent,
    SwitchOwnProps<SwitchComponent>,
    SwitchPropsOverrides
  >

export type SwitchOwnerState<SwitchComponent extends ElementType = 'input'> =
  SwitchProps<SwitchComponent> & {
    checked: boolean
    disabled: boolean
    size: SwitchVariants['size']
    color: SwitchVariants['color']
    defaultChecked: boolean
  }
