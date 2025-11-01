import type { ClassValue } from 'clsx'
import type { ElementType, Key, ReactNode } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type { Interpolation } from '@nex-ui/system'
import type {
  ComponentSlotClasses,
  OverrideProps,
  ComponentPropsWithCommonProps,
  HTMLMotionProps,
} from '../../types/utils'
import type { AccordionVariants } from '../../theme/recipes'

// Accordion
export interface AccordionPropsOverrides {}

type AccordionOwnProps<RootComponent extends ElementType = 'div'> = {
  /**
   * The contents of the collection. Usually the array of AccordionItem.
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
   * If true, the Accordion items can be expanded at the same time.
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
   * Handler that is called when the expanded keys change.
   */
  onExpandedKeysChange?: (keys: Key[]) => void

  /**
   * If true, the content for all Accordion items is always mounted.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, the indicator is hidden for all Accordion items.
   *
   * @default false
   */
  hideIndicator?: boolean

  /**
   * The expanded indicator for all Accordion items, usually an arrow icon.
   */
  indicator?: ReactNode

  /**
   * The props to modify the framer motion animation.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * The props to modify the framer motion animation.
   */
  indicatorMotionProps?: HTMLMotionProps<'span'>

  /**
   * The keys of Accordion items that are disabled.
   */
  disabledKeys?: Key[]

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * If true, all Accordion items are disabled.
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
}

export type AccordionProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AccordionOwnProps<RootComponent>,
    AccordionPropsOverrides
  >

// AccordionItem
export interface AccordionItemPropsOverrides {}

export interface AccordionItemSlotProps {
  heading?: ComponentPropsWithCommonProps<'h3'>
  indicator?: ComponentPropsWithCommonProps<DOMMotionComponents['span']>
  content?: ComponentPropsWithCommonProps<'div'>
  trigger?: ComponentPropsWithCommonProps<'button'>
}

type AccordionItemOwnProps<RootComponent extends ElementType = 'div'> = {
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
   * The key of the Accordion item.
   */
  itemKey?: Key

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue

  /**
   * The title of the Accordion item.
   */
  title?: ReactNode

  /**
   * The props to modify the framer motion animation.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * If true, the Accordion item is disabled.
   */
  disabled?: boolean

  /**
   * If true, the Accordion item content is always mounted.
   */
  keepMounted?: boolean

  /**
   * If true, the Accordion item indicator is hidden.
   */
  hideIndicator?: boolean

  /**
   * The expanded indicator for the Accordion item, usually an arrow icon.
   */
  indicator?: ReactNode

  /**
   * The props to modify the framer motion animation.
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
}

export type AccordionItemProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AccordionItemOwnProps<RootComponent>,
    AccordionItemPropsOverrides
  >
export type AccordionItemOwnerState<RootComponent extends ElementType = 'div'> =
  AccordionItemProps<RootComponent> & {
    expanded: boolean
    variant: AccordionVariants['variant']
  }

export type AccordionGroupContextValue = {
  expandedKeys: Key[]
  toggleExpandedKey: (key: Key) => void
  keepMounted: boolean
  hideIndicator: boolean
  disabledKeys: Key[]
  disabled: boolean
  indicator?: ReactNode
  motionProps?: HTMLMotionProps<'div'>
  variant: AccordionVariants['variant']
  indicatorMotionProps?: HTMLMotionProps<'span'>
}
