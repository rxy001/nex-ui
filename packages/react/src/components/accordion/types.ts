import type { ClassValue } from 'clsx'
import type { ElementType, Key, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { HTMLMotionProps } from 'motion/react'
import type {
  ComponentSlotClasses,
  OverrideProps,
  SlotProps,
} from '../../types/utils'
import type { AccordionVariants } from '../../theme/recipes'

// Accordion
export interface AccordionPropsOverrides {}

type AccordionOwnProps<RootComponent extends ElementType = 'div'> = {
  /**
   * The Accordion content, usually one or more AccordionItem elements.
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
   * Handler that is called when the expanded keys change.
   */
  onExpandedKeysChange?: (keys: Key[]) => void

  /**
   * If true, the content for all AccordionItems is always mounted.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, the indicator is hidden for all AccordionItems.
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
   * If true, all AccordionItems are disabled.
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

export type AccordionItemSlotProps = {
  heading?: SlotProps<'h3'>
  indicator?: SlotProps<'span'>
  content?: SlotProps<'div'>
  trigger?: SlotProps<'button'>
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
   * If true, the AccordionItem is disabled.
   */
  disabled?: boolean

  /**
   * If true, the AccordionItem content is always mounted.
   */
  keepMounted?: boolean

  /**
   * If true, the AccordionItem indicator is hidden.
   */
  hideIndicator?: boolean

  /**
   * The expanded indicator for the AccordionItem, usually an arrow icon.
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

export type AccordionItemOwnerState = AccordionItemProps & {
  expanded: boolean
  variant: AccordionVariants['variant']
}
