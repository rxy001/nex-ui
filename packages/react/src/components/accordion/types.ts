import type { ClassValue } from 'clsx'
import type { ElementType, Key, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { HTMLMotionProps } from 'motion/react'
import type {
  ComponentSlotClasses,
  OverrideProps,
  SlotProps,
} from '../../types/utils'
import type { AccordionVariants } from '../../themes/recipes'

// Accordion
export interface AccordionPropsOverrides {}

interface AccordionOwnProps<RootComponent extends ElementType = 'div'> {
  /**
   * The collection items, typically an array of AccordionItem components.
   */
  children?: ReactNode

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
   * If true, multiple AccordionItems can be expanded at the same time.
   *
   * @default false
   */
  multiple?: boolean

  /**
   * The currently expanded keys in the collection (controlled).
   */
  expandedKeys?: Key[]

  /**
   * The default expanded keys in the collection (uncontrolled).
   */
  defaultExpandedKeys?: Key[]

  /**
   * Callback fired when the expanded keys change.
   */
  onExpandedKeysChange?: (keys: Key[]) => void

  /**
   * If true, keeps the content for all AccordionItems mounted in the DOM when not expanded.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, hides the indicator for all AccordionItems.
   *
   * @default false
   */
  hideIndicator?: boolean

  /**
   * The expanded indicator for all AccordionItems, usually an arrow icon.
   */
  indicator?: ReactNode

  /**
   * The motionProps for all AccordionItems.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * The indicatorMotionProps for all AccordionItems.
   */
  indicatorMotionProps?: HTMLMotionProps<'span'>

  /**
   * The keys of AccordionItems that are disabled.
   */
  disabledKeys?: Key[]

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * If true, disables all AccordionItems.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The Accordion appearance style.
   *
   * @default 'underlined'
   */
  variant?: AccordionVariants['variant']

  /**
   * If true, disables the animation for all AccordionItems.
   *
   * @default false
   */
  disableAnimation?: boolean
}

export type AccordionProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AccordionOwnProps<RootComponent>,
    AccordionPropsOverrides
  >

// AccordionItem
export interface AccordionItemPropsOverrides {}

interface AccordionItemSlotProps {
  heading?: SlotProps<'h3'>
  indicator?: SlotProps<'span'>
  content?: SlotProps<'div'>
  trigger?: SlotProps<'button'>
}

interface AccordionItemOwnProps<RootComponent extends ElementType = 'div'> {
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The content of the component.
   */
  children?: ReactNode

  /**
   * The unique key of the AccordionItem.
   */
  itemKey?: Key

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The title of the AccordionItem.
   */
  title?: ReactNode

  /**
   * The props to modify the framer motion animation.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * If true, disables the AccordionItem.
   */
  disabled?: boolean

  /**
   * If true, keeps the content mounted in the DOM when not expanded.
   */
  keepMounted?: boolean

  /**
   * If true, hides the indicator for the AccordionItem.
   */
  hideIndicator?: boolean

  /**
   * The expanded indicator for the AccordionItem, usually an arrow icon.
   */
  indicator?: ReactNode

  /**
   * The props to modify the framer motion animation for the indicator.
   */
  indicatorMotionProps?: HTMLMotionProps<'span'>

  /**
   * The props used for each slot.
   */
  slotProps?: AccordionItemSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof AccordionItemSlotProps>

  /**
   * If true, disables the animation for the AccordionItem.
   *
   * @default false
   */
  disableAnimation?: boolean
}

export type AccordionItemProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AccordionItemOwnProps<RootComponent>,
    AccordionItemPropsOverrides
  >

export interface AccordionItemOwnerState extends AccordionItemProps {
  expanded: boolean
  variant: AccordionVariants['variant']
}
