import type { ComponentType, ElementType, Key, ReactNode } from 'react'
import type { MotionProps } from 'motion/react'
import type {
  ComponentUtilityClasses,
  OverrideProps,
  SxProps,
  ComponentPropsWithCommonProps,
} from '../../types/utils'
import type { Icon } from '../icon'

// Accordion
export interface AccordionPropsOverrides {}

type AccordionOwnProps<RootComponent extends ElementType = 'div'> = {
  as?: RootComponent
  sx?: SxProps<AccordionOwnerState<RootComponent>>
  multiple?: boolean
  expandedKeys?: Key[]
  defaultExpandedKeys?: Key[]
  onExpandedKeysChange?: (keys: Key[]) => void
  chidlren?: ReactNode
  keepMounted?: boolean
  hideIndicator?: boolean
  indicator?: ComponentType<any>
  motionProps?: MotionProps
  disabledExpandedKeys?: Key[]
  disabled?: boolean
  hideDivider?: boolean
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
    hideDivider: boolean
  }

// AccordionItem
export interface AccordionItemPropsOverrides {}

export interface AccordionItemSlotProps<RootComponent extends ElementType> {
  heading?: ComponentPropsWithCommonProps<
    'div',
    AccordionItemOwnerState<RootComponent>
  >
  indicator?: ComponentPropsWithCommonProps<
    typeof Icon,
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
  as?: RootComponent
  sx?: SxProps<AccordionItemOwnerState<RootComponent>>
  chidlren?: ReactNode
  itemKey?: Key
  title?: ReactNode
  motionProps?: MotionProps
  disabled?: boolean
  keepMounted?: boolean
  hideIndicator?: boolean
  indicator?: ComponentType<any>
  slotProps?: AccordionItemSlotProps<RootComponent>
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
    hideDivider: boolean
  }
