import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { HTMLMotionProps } from 'motion/react'
import type {
  OverrideProps,
  SlotProps,
  ComponentSlotClasses,
} from '../../types/utils'
import type { ElementType, ReactNode } from 'react'
import type { DialogContentVariants } from '../../theme/recipes'
import type {
  ModalCloseProps,
  ModalContentProps,
  ModalPortalProps,
  ModalTriggerProps,
  ModalProps,
} from '../modal'

// ------------- Dialog --------------
type DialogOwnProps = ModalProps & {
  /**
   * If true, shows the Dialog by default. (uncontrolled)
   */
  defaultOpen?: boolean
}

export interface DialogPropsOverrides {}

export type DialogProps = DialogOwnProps & DialogPropsOverrides

// ------------- DialogContent -------------
type DialogContentSlotProps = {
  closeButton?: SlotProps<'button'>
  paper?: SlotProps<'div'>
  backdrop?: SlotProps<'div'>
}

export interface DialogContentPropsOverrides {}

type DialogContentOwnProps<RootComponent extends ElementType = 'div'> = Pick<
  ModalPortalProps,
  'container'
> &
  Pick<
    ModalContentProps,
    | 'restoreFocus'
    | 'closeOnEscape'
    | 'preventScroll'
    | 'autoFocus'
    | 'closeOnInteractOutside'
  > & {
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
     * Additional class names to apply to the root.
     */
    className?: ClassValue

    /**
     * Usually, DialogHeader, DialogBody, DialogFooter, etc.
     */
    children?: ReactNode

    /**
     * If true, hides the backdrop when the Dialog is open.
     *
     * @default false
     */
    hideBackdrop?: boolean

    /**
     * The props to modify the framer motion animation.
     */
    motionProps?:
      | ((
          placement: DialogContentVariants['placement'],
        ) => HTMLMotionProps<'div'>)
      | HTMLMotionProps<'div'>

    /**
     * If true, disables the animation for the Dialog.
     *
     * @default false
     */
    disableAnimation?: boolean

    /**
     * The props used for each slot.
     */
    slotProps?: DialogContentSlotProps

    /**
     * The className used for each slot.
     */
    classNames?: ComponentSlotClasses<keyof DialogContentSlotProps>

    /**
     * The size of the Dialog.
     * @default 'md'
     */
    size?: DialogContentVariants['size']

    /**
     * Custom close button to display in the top-right corner.
     */
    closeIcon?: ReactNode

    /**
     * If true, hides the close button when the Dialog is open.
     * @default false
     */
    hideCloseButton?: boolean

    /**
     * The Dialog scroll behavior.
     * @default 'outside'
     */
    scroll?: DialogContentVariants['scroll']

    /**
     * The display position of the Dialog.
     * @default 'top'
     */
    placement?: DialogContentVariants['placement']

    /**
     * If true, keeps the Dialog mounted in the DOM when not open.
     *
     * @default false
     */
    keepMounted?: boolean

    /**
     * The id(s) of the element(s) that label the dialog.
     */
    'aria-labelledby'?: string

    /**
     * The id(s) of the element(s) that describe the dialog.
     */
    'aria-describedby'?: string
  }

export type DialogContentProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DialogContentOwnProps<RootComponent>,
    DialogContentPropsOverrides
  >

// ------------- DialogHeader -------------
export interface DialogHeaderPropsOverrides {}

type DialogHeaderOwnProps<RootComponent extends ElementType> = {
  /**
   * The component or element to render as the root.
   * @default 'h2'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: Interpolation

  /**
   * The content of the DialogHeader.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
}

export type DialogHeaderProps<RootComponent extends ElementType = 'h2'> =
  OverrideProps<
    RootComponent,
    DialogHeaderOwnProps<RootComponent>,
    DialogHeaderPropsOverrides
  >

// ------------- DialogBody -------------
export interface DialogBodyPropsOverrides {}

type DialogBodyOwnProps<RootComponent extends ElementType> = {
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
   * The content of the DialogBody.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
}

export type DialogBodyProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DialogBodyOwnProps<RootComponent>,
    DialogBodyPropsOverrides
  >

// ------------- DialogFooter -------------
export interface DialogFooterPropsOverrides {}

type DialogFooterOwnProps<RootComponent extends ElementType> = {
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
   * The content of the DialogFooter.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
}

export type DialogFooterProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DialogFooterOwnProps<RootComponent>,
    DialogFooterPropsOverrides
  >

// ------------- DialogTrigger -------------
export interface DialogTriggerProps extends ModalTriggerProps {}

// ------------- DialogClose -------------
export interface DialogCloseProps extends ModalCloseProps {}

export type DialogPaperMotionProps = {
  children?: ReactNode
  placement: Exclude<DialogContentProps['placement'], undefined>
  motionProps?: DialogContentProps['motionProps']
}
