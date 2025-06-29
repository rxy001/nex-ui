import { Button } from '../button'
import type {
  OverrideProps,
  SxProps,
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
} from '../../types/utils'
import type { ElementType, ReactNode } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type {
  ModalBodyVariants,
  ModalContentVariants,
  ModalFooterVariants,
  ModalHeaderVariants,
  ModalVariants,
} from '../../theme/recipes'

// ------------- Modal --------------
type ModalSlotProps<RootComponent extends ElementType> = {
  backdrop?: ComponentPropsWithCommonProps<
    DOMMotionComponents['div'],
    ModalOwnerState<RootComponent>
  >
  container?: ComponentPropsWithCommonProps<
    'div',
    ModalOwnerState<RootComponent>
  >
}

type ModalOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<ModalOwnerState<RootComponent>>

  children?: ReactNode

  open?: boolean

  defaultOpen?: boolean

  onOpenChange?: (open: boolean) => void

  container?: Element | null | (() => Element | null)

  /**
   * The props used for each slot.
   */
  slotProps?: ModalSlotProps<RootComponent>

  classes?: ComponentUtilityClasses<'backdrop' | 'container'>

  keepMounted?: boolean

  scroll?: 'inside' | 'outside'

  closeOnInteractOutside?: boolean

  placement?: ModalVariants['placement']

  hideCloseButton?: boolean
}

export interface ModalPropsOverrides {}

export type ModalProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    ModalOwnProps<RootComponent>,
    ModalPropsOverrides
  >

export type ModalOwnerState<RootComponent extends ElementType = 'div'> =
  ModalProps<RootComponent> & {
    keepMounted: boolean
    open: boolean
  }

// ------------- ModalTrigger -------------
export type ModalTriggerProps = {
  children?: ReactNode
}

// ------------- ModalClose -------------
export interface ModalCloseProps {
  children?: ReactNode
}

// ------------- ModalContent -------------
type ModalContentSlotProps<RootComponent extends ElementType> = {
  closeButton?: ComponentPropsWithCommonProps<
    typeof Button<'button'>,
    ModalContentOwnerState<RootComponent>
  >
}

export interface ModalContentPropsOverrides {}

type ModalContentOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProps<ModalContentOwnerState<RootComponent>>
  children?: ReactNode
  width?: ModalContentVariants['width'] | number
  slotProps?: ModalContentSlotProps<RootComponent>
}

export type ModalContentProps<RootComponent extends ElementType = 'section'> =
  OverrideProps<
    RootComponent,
    ModalContentOwnProps<RootComponent>,
    ModalContentPropsOverrides
  >

export type ModalContentOwnerState<
  RootComponent extends ElementType = 'section',
> = ModalContentProps<RootComponent>

// ------------- ModalHeader -------------
export interface ModalHeaderPropsOverrides {}

type ModalHeaderOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProps<ModalHeaderOwnerState<RootComponent>>
  children?: ReactNode
  size?: ModalHeaderVariants['size']
}

export type ModalHeaderProps<RootComponent extends ElementType = 'h2'> =
  OverrideProps<
    RootComponent,
    ModalHeaderOwnProps<RootComponent>,
    ModalHeaderPropsOverrides
  >

export type ModalHeaderOwnerState<RootComponent extends ElementType = 'h2'> =
  ModalHeaderProps<RootComponent>

// ------------- ModalBody -------------
export interface ModalBodyPropsOverrides {}

type ModalBodyOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProps<ModalBodyOwnerState<RootComponent>>
  children?: ReactNode
  size?: ModalBodyVariants['size']
}

export type ModalBodyProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    ModalBodyOwnProps<RootComponent>,
    ModalBodyPropsOverrides
  >

export type ModalBodyOwnerState<RootComponent extends ElementType = 'div'> =
  ModalBodyProps<RootComponent>

// ------------- ModalFooter -------------
export interface ModalFooterPropsOverrides {}

type ModalFooterOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProps<ModalFooterOwnerState<RootComponent>>
  children?: ReactNode
  size?: ModalFooterVariants['size']
}

export type ModalFooterProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    ModalFooterOwnProps<RootComponent>,
    ModalFooterPropsOverrides
  >

export type ModalFooterOwnerState<RootComponent extends ElementType = 'div'> =
  ModalFooterOwnProps<RootComponent>
