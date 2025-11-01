import type { DOMMotionComponents } from 'motion/react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type {
  OverrideProps,
  ComponentPropsWithCommonProps,
  ComponentSlotClasses,
  HTMLMotionProps,
} from '../../types/utils'
import type { ElementType, ReactNode } from 'react'
import type { DialogContentVariants } from '../../theme/recipes'
import type { ModalProps } from '../modal'

// ------------- Dialog --------------
type DialogSlotProps = {
  backdrop?: ComponentPropsWithCommonProps<'div'>
}

type DialogOwnProps<RootComponent extends ElementType> = {
  /**
   * The component or element to render as the root.
   * @default m.div
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
   * Usually, DialogContent, DialogTrigger, etc.
   */
  children?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: DialogSlotProps

  /**
   * The className used for each slot.
   */
  classNames?: ComponentSlotClasses<keyof DialogSlotProps>

  /**
   * If true, the backdrop is not rendered.
   *
   * @default false
   */
  hideBackdrop?: boolean

  /**
   * If true, closes the Dialog when the backdrop is clicked.
   *
   * @default true
   */
  closeOnInteractBackdrop?: boolean
} & Omit<ModalProps, 'closeOnInteractOutside'>

export interface DialogPropsOverrides {}

export type DialogProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = OverrideProps<
  RootComponent,
  DialogOwnProps<RootComponent>,
  DialogPropsOverrides
>

// ------------- DialogContent -------------
type DialogContentSlotProps = {
  closeButton?: ComponentPropsWithCommonProps<'button'>
  paper?: ComponentPropsWithCommonProps<DOMMotionComponents['section']>
}

export interface DialogContentPropsOverrides {}

type DialogContentOwnProps<RootComponent extends ElementType = 'div'> = {
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
   * It's usually the DialogHeader、DialogBody andd DialogFooter component.
   */
  children?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: DialogContentSlotProps

  /**
   * Determine the max-width of the dialog
   * @default 'md'
   */
  size?: DialogContentVariants['size']

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
  classNames?: ComponentSlotClasses<'paper' | 'closeButton'>

  /**
   * The dialog scroll behavior.
   * @default 'outside''
   */
  scroll?: DialogContentVariants['scroll']

  /**
   * The dialog position.
   * @default 'top'
   */
  placement?: DialogContentVariants['placement']

  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby'?: string

  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby'?: string

  /**
   * The props to modify the framer motion animation.
   * Use the `variants` API to create your own animation.
   */
  motionProps?:
    | ((
        placement: DialogContentVariants['placement'],
      ) => HTMLMotionProps<'section'>)
    | HTMLMotionProps<'section'>

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
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
export interface DialogTriggerProps {
  children?: ReactNode
}

// ------------- DialogClose -------------
export interface DialogCloseProps {
  children?: ReactNode
}
