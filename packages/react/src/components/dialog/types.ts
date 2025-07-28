import type * as m from 'motion/react-m'
import type {
  OverrideProps,
  SxProp,
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
} from '../../types/utils'
import type { ElementType, ReactNode } from 'react'
import type { DialogContentVariants, DialogVariants } from '../../theme/recipes'

// ------------- Dialog --------------
type DialogSlotProps<RootComponent extends ElementType> = {
  backdrop?: ComponentPropsWithCommonProps<
    'div',
    DialogOwnerState<RootComponent>
  >
  panel?: ComponentPropsWithCommonProps<'div', DialogOwnerState<RootComponent>>
}

type DialogOwnProps<RootComponent extends ElementType> = {
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
   * Additional class names to apply to the root element.
   */
  className?: string

  /**
   * The content of the dialog. It's usually the `DialogContent` component.
   */
  children?: ReactNode

  /**
   * If true, the dialog is open.
   */
  open?: boolean

  /**
   * If true, the dialog is shown by default.
   */
  defaultOpen?: boolean

  /**
   * Handler that is called when the dialog is opened or closed.
   */
  onOpenChange?: (open: boolean) => void

  /**
   * The container element in which the dialog will be placed.
   * @default document.body
   */
  container?: Element | null | (() => Element | null)

  /**
   * If true, always keep the children in the DOM.
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, close the dialog when the escape key is pressed.
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * If true, the dialog will restore focus to previously focused element once the dialog is hidden or unmounted.
   * @default true
   */
  restoreFocus?: boolean

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
   * Determine the max-width of the dialog.
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
   * @default true
   */
  closeOnInteractBackdrop?: boolean

  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby'?: string

  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby'?: string
}

export interface DialogPropsOverrides {}

export type DialogProps<RootComponent extends ElementType = typeof m.div> =
  OverrideProps<
    RootComponent,
    DialogOwnProps<RootComponent>,
    DialogPropsOverrides
  >

export type DialogOwnerState<RootComponent extends ElementType = typeof m.div> =
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
    restoreFocus: boolean
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
    'button',
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

  /**
   * It's usually the DialogHeader、DialogBody andd DialogFooter component.
   */
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
   * If true, the close button is not rendered.
   * @default false
   */
  hideCloseButton?: boolean

  /**
   * If true, the dialog is full-screen.
   * @default false
   */
  fullScreen?: boolean

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'root' | 'closeButton'>
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
  hideCloseButton: boolean
  closeIcon: ReactNode
}

// ------------- DialogHeader -------------
export interface DialogHeaderPropsOverrides {}

type DialogHeaderOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'h2'
   */

  as?: RootComponent
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<DialogHeaderOwnerState<RootComponent>>

  /**
   * The content of the dialog header.
   */
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
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<DialogBodyOwnerState<RootComponent>>

  /**
   * The content of the dialog body.
   */
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
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<DialogFooterOwnerState<RootComponent>>

  /**
   * The content of the dialog footer.
   */
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
