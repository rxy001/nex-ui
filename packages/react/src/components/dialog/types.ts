import { ButtonBase } from '../buttonBase/ButtonBase'
import type { DOMMotionComponents } from 'motion/react'
import type {
  OverrideProps,
  SxProp,
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
} from '../../types/utils'
import type { ElementType, ReactNode } from 'react'
import type { DialogContentVariants, DialogVariants } from '../../theme/recipes'
import type { ModalProps } from '../modal'

// ------------- Dialog --------------
type DialogSlotProps<RootComponent extends ElementType> = {
  backdrop?: ComponentPropsWithCommonProps<
    'div',
    DialogOwnerState<RootComponent>
  >
  panel?: ComponentPropsWithCommonProps<
    DOMMotionComponents['div'],
    DialogOwnerState<RootComponent>
  >
}

type DialogOwnProps<RootComponent extends ElementType> = Omit<
  ModalProps,
  'closeOnInteractOutside'
> & {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<DialogOwnerState<RootComponent>>

  /**
   * The props used for each slot.
   */
  slotProps?: DialogSlotProps<RootComponent>

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'root' | 'backdrop' | 'panel'>

  /**
   * The dialog scroll behavior.
   * @default 'outside''
   */
  scroll?: 'inside' | 'outside'

  /**
   * The dialog position.
   * @default 'top'
   */
  placement?: DialogVariants['placement']

  /**
   * If true, the close buton is not rendered.
   * @default false
   */
  hideCloseButton?: boolean

  /**
   * Determine the max-width of the dialog
   * @default 'md'
   */
  maxWidth?: DialogContentVariants['maxWidth']

  /**
   * If true, the dialog is full-screen.
   * @default false
   */
  fullScreen?: boolean

  /**
   * If true, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop?: boolean

  /**
   * If true, the dialog prevents page scrolling.
   * @default fullScreen
   */
  preventScroll?: boolean

  /**
   * Custom close button to display on top right corner.
   */
  closeIcon?: ReactNode

  /**
   * If true, close the dialog when the backdrop is clicked.
   */
  closeOnInteractBackdrop?: boolean
}

export interface DialogPropsOverrides {}

export type DialogProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DialogOwnProps<RootComponent>,
    DialogPropsOverrides
  >

export type DialogOwnerState<RootComponent extends ElementType = 'div'> =
  DialogProps<RootComponent> & {
    hideBackdrop: boolean
    fullScreen: boolean
    preventScroll: boolean
    scroll: 'inside' | 'outside'
    maxWidth: DialogContentVariants['maxWidth']
    open: boolean
    setOpen: (open: boolean) => void
    placement: DialogVariants['placement']
    keepMounted: boolean
    hideCloseButton: boolean
    closeOnInteractBackdrop: boolean
    closeOnEscape: boolean
  }

// ------------- DialogTrigger -------------
export type DialogTriggerProps = {
  children?: ReactNode
}

// ------------- DialogClose -------------
export interface DialogCloseProps {
  children?: ReactNode
}

// ------------- DialogContent -------------
type DialogContentSlotProps<RootComponent extends ElementType> = {
  closeButton?: ComponentPropsWithCommonProps<
    typeof ButtonBase<'button'>,
    DialogContentOwnerState<RootComponent>
  >
}

export interface DialogContentPropsOverrides {}

type DialogContentOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'section'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<DialogContentOwnerState<RootComponent>>

  children?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: DialogContentSlotProps<RootComponent>

  /**
   * Determine the max-width of the dialog
   * @default 'md'
   */
  maxWidth?: DialogContentVariants['maxWidth']

  /**
   * Custom close button to display on top right corner.
   */
  closeIcon?: ReactNode

  /**
   * If true, the dialog is full-screen.
   * @default false
   */
  fullScreen?: boolean
}

export type DialogContentProps<RootComponent extends ElementType = 'section'> =
  OverrideProps<
    RootComponent,
    DialogContentOwnProps<RootComponent>,
    DialogContentPropsOverrides
  >

export type DialogContentOwnerState<
  RootComponent extends ElementType = 'section',
> = DialogContentProps<RootComponent> & {
  maxWidth: DialogContentVariants['maxWidth']
  fullScreen: boolean
}

// ------------- DialogHeader -------------
export interface DialogHeaderPropsOverrides {}

type DialogHeaderOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProp<DialogHeaderOwnerState<RootComponent>>
  children?: ReactNode
}

export type DialogHeaderProps<RootComponent extends ElementType = 'h2'> =
  OverrideProps<
    RootComponent,
    DialogHeaderOwnProps<RootComponent>,
    DialogHeaderPropsOverrides
  >

export type DialogHeaderOwnerState<RootComponent extends ElementType = 'h2'> =
  DialogHeaderProps<RootComponent>

// ------------- DialogBody -------------
export interface DialogBodyPropsOverrides {}

type DialogBodyOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProp<DialogBodyOwnerState<RootComponent>>
  children?: ReactNode
}

export type DialogBodyProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DialogBodyOwnProps<RootComponent>,
    DialogBodyPropsOverrides
  >

export type DialogBodyOwnerState<RootComponent extends ElementType = 'div'> =
  DialogBodyProps<RootComponent>

// ------------- DialogFooter -------------
export interface DialogFooterPropsOverrides {}

type DialogFooterOwnProps<RootComponent extends ElementType> = {
  as?: RootComponent
  sx?: SxProp<DialogFooterOwnerState<RootComponent>>
  children?: ReactNode
}

export type DialogFooterProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DialogFooterOwnProps<RootComponent>,
    DialogFooterPropsOverrides
  >

export type DialogFooterOwnerState<RootComponent extends ElementType = 'div'> =
  DialogFooterOwnProps<RootComponent>
