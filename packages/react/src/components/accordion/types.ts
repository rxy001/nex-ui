import type { ElementType, Key, ReactNode } from 'react'
import type { HTMLMotionProps, DOMMotionComponents } from 'motion/react'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProps,
  ComponentPropsWithCommonProps,
} from '../../types/utils'
import type { AccordionItemVariants } from '../../theme/recipes'

// Accordion
export interface AccordionPropsOverrides {}

type AccordionOwnProps<RootComponent extends ElementType = 'div'> = {
  /**
   * The component or element to render as the root.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<AccordionOwnerState<RootComponent>>

  /**
   * If true, the accordion items can be expanded at the same time.
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
   * The contents of the collection. Usually the array of AccordionItem.
   */
  chidlren?: ReactNode

  /**
   * If true, the Accordion items content should always be mounted.
   * @default true
   */
  keepMounted?: boolean

  /**
   * If true, the Accordion items indicator is hidden.
   * @default false
   */
  hideIndicator?: boolean

  /**
   * The accordion item expanded indicator, usually an arrow icon.
   */
  indicator?: ReactNode

  /**
   * The motion properties of the Accordion.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * The item keys that are disabled.
   */
  disabledExpandedKeys?: Key[]

  /**
   * If true, the Accordion items are disabled
   * @default false
   */
  disabled?: boolean

  /**
   * The accordion appearance style.
   * @default 'underlined'
   */
  variant?: AccordionItemVariants['variant']
}

export type AccordionProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    AccordionOwnProps<RootComponent>,
    AccordionPropsOverrides
  >

export type AccordionOwnerState<RootComponent extends ElementType = 'div'> =
  AccordionProps<RootComponent> & {
    hideIndicator: boolean
    multiple: boolean
    disabled: boolean
    keepMounted: boolean
    disabledExpandedKeys: Key[]
    defaultExpandedKeys: Key[]
    expandedKeys: Key[]
    variant: AccordionItemVariants['variant']
  }

// AccordionItem
export interface AccordionItemPropsOverrides {}

export interface AccordionItemSlotProps<RootComponent extends ElementType> {
  heading?: ComponentPropsWithCommonProps<
    'div',
    AccordionItemOwnerState<RootComponent>
  >
  indicator?: ComponentPropsWithCommonProps<
    DOMMotionComponents['span'],
    AccordionItemOwnerState<RootComponent>
  >
  content?: ComponentPropsWithCommonProps<
    'div',
    AccordionItemOwnerState<RootComponent>
  >
  trigger?: ComponentPropsWithCommonProps<
    'button',
    AccordionItemOwnerState<RootComponent>
  >
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
  sx?: SxProps<AccordionItemOwnerState<RootComponent>>

  /**
   * The content of the component.
   */
  chidlren?: ReactNode

  /**
   * The accordion item key.
   */
  itemKey?: Key

  /**
   * The accordion item title.
   */
  title?: ReactNode

  /**
   * The props to modify the framer motion animation. Use the variants API to create your own animation.
   */
  motionProps?: HTMLMotionProps<'div'>

  /**
   * If true, the accordion item is disabled.
   */
  disabled?: boolean

  /**
   * If true, the Accordion item content should always be mounted.
   */
  keepMounted?: boolean

  /**
   * If true, the Accordion item indicator is hidden.
   */
  hideIndicator?: boolean

  /**
   * The accordion item expanded indicator.
   */
  indicator?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: AccordionItemSlotProps<RootComponent>

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<
    'heading' | 'indicator' | 'panel' | 'trigger'
  >
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
    keepMounted: boolean
    hideIndicator: boolean
    itemKey: Key
    disabled: boolean
    variant: AccordionItemVariants['variant']
  }

export type AccordionGroupContextValue = {
  expandedKeys: Key[]
  toggleExpandedKey: (key: Key) => void
  keepMounted: boolean
  hideIndicator: boolean
  disabledExpandedKeys: Key[]
  disabled: boolean
  indicator?: ReactNode
  motionProps?: HTMLMotionProps<'div'>
  variant: AccordionItemVariants['variant']
}
