import type { DOMMotionComponents } from 'motion/react'
import type { ElementType, ReactNode } from 'react'
import type { DrawerContentVariants } from '../../theme/recipes'
import type {
  OverrideProps,
  SxProp,
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
  HTMLMotionProps,
} from '../../types/utils'

// ----------------Drawer----------------
type DrawerSlotProps<RootComponent extends ElementType> = {
  backdrop?: ComponentPropsWithCommonProps<
    'div',
    DrawerOwnerState<RootComponent>
  >
}

type DrawerOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<DrawerOwnerState<RootComponent>>

  /**
   * The content of the drawer. It's usually the `DrawerContent` component.
   */
  children?: ReactNode

  /**
   * Additional class names to apply to the root element.
   */
  className?: string

  /**
   * If true, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop?: boolean

  /**
   * The props used for each slot.
   */
  slotProps?: DrawerSlotProps<RootComponent>

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'root' | 'backdrop'>

  /**
   * If true, the drawer is open.
   */
  open?: boolean

  /**
   * If true, the drawer is shown by default.
   */
  defaultOpen?: boolean

  /**
   * Handler that is called when the drawer is opened or closed.
   */
  onOpenChange?: (open: boolean) => void

  /**
   * The container element in which the drawer will be placed.
   * @default document.body
   */
  container?: HTMLElement | null | (() => HTMLElement | null)

  /**
   * If true, always keep the children in the DOM.
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, close the drawer when the backdrop is clicked.
   * @default true
   */
  closeOnInteractBackdrop?: boolean

  /**
   * If true, the drawer prevents page scrolling.
   * @default false
   */
  preventScroll?: boolean

  /**
   * If true, close the drawer when the escape key is pressed.
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * If true, the drawer will restore focus to previously focused element once the drawer is hidden or unmounted.
   * @default true
   */
  restoreFocus?: boolean
}

export type DrawerOwnerState<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = DrawerOwnProps<RootComponent> & {
  setOpen: (open: boolean) => void
  open: boolean
  preventScroll: boolean
  keepMounted: boolean
  restoreFocus: boolean
  defaultOpen: boolean
  hideBackdrop: boolean
  closeOnInteractBackdrop: boolean
  closeOnEscape: boolean
}

export interface DrawerPropsOverrides {}

export type DrawerProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = OverrideProps<
  RootComponent,
  DrawerOwnProps<RootComponent>,
  DrawerPropsOverrides
>

// ----------------DrawerContent----------------
type DrawerContentSlotProps<RootComponent extends ElementType> = {
  closeButton?: ComponentPropsWithCommonProps<
    'button',
    DrawerContentOwnerState<RootComponent>
  >
  paper?: ComponentPropsWithCommonProps<
    DOMMotionComponents['section'],
    DrawerContentOwnerState<RootComponent>
  >
}

export interface DrawerContentPropsOverrides {}

type DrawerContentOwnProps<RootComponent extends ElementType = 'div'> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<DrawerContentOwnerState<RootComponent>>

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'root' | 'paper' | 'closeButton'>

  /**
   * It's usually the DrawerHeader、DrawerBody andd DrawerFooter component.
   */
  children?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: DrawerContentSlotProps<RootComponent>

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
   * The size of the drawer.
   * @default 'md'
   */
  size?: DrawerContentVariants['size']

  /**
   * The placement of the drawer.
   * @default 'right'
   */
  placement?: DrawerContentVariants['placement']

  /**
   * The props to modify the framer motion animation.
   * Use the `variants` API to create your own animation.
   */
  motionProps?:
    | HTMLMotionProps<'div'>
    | ((
        placement: DrawerContentVariants['placement'],
      ) => HTMLMotionProps<'div'>)

  /**
   * The id(s) of the element(s) that label the drawer.
   */
  'aria-labelledby'?: string

  /**
   * The id(s) of the element(s) that describe the drawer.
   */
  'aria-describedby'?: string
}

export type DrawerContentProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DrawerContentOwnProps<RootComponent>,
    DrawerContentPropsOverrides
  >

export type DrawerContentOwnerState<RootComponent extends ElementType = 'div'> =
  DrawerContentProps<RootComponent> & {
    hideCloseButton: boolean
    size: DrawerContentVariants['size']
    placement: DrawerContentVariants['placement']
  }

// ------------- DrawerHeader -------------
export interface DrawerHeaderPropsOverrides {}

type DrawerHeaderOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'h2'
   */

  as?: RootComponent
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<DrawerHeaderOwnerState<RootComponent>>

  /**
   * The content of the drawer header.
   */
  children?: ReactNode
}

export type DrawerHeaderProps<RootComponent extends ElementType = 'h2'> =
  OverrideProps<
    RootComponent,
    DrawerHeaderOwnProps<RootComponent>,
    DrawerHeaderPropsOverrides
  >

export type DrawerHeaderOwnerState<RootComponent extends ElementType = 'h2'> =
  DrawerHeaderProps<RootComponent>

// ------------- DrawerBody -------------
export interface DrawerBodyPropsOverrides {}

type DrawerBodyOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<DrawerBodyOwnerState<RootComponent>>

  /**
   * The content of the drawer body.
   */
  children?: ReactNode
}

export type DrawerBodyProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DrawerBodyOwnProps<RootComponent>,
    DrawerBodyPropsOverrides
  >

export type DrawerBodyOwnerState<RootComponent extends ElementType = 'div'> =
  DrawerBodyProps<RootComponent>

// ------------- DrawerFooter -------------
export interface DrawerFooterPropsOverrides {}

type DrawerFooterOwnProps<RootComponent extends ElementType> = {
  /**
   * The component used for the root element.
   * @default 'div'
   */
  as?: RootComponent

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProp<DrawerFooterOwnerState<RootComponent>>

  /**
   * The content of the drawer footer.
   */
  children?: ReactNode
}

export type DrawerFooterProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DrawerFooterOwnProps<RootComponent>,
    DrawerFooterPropsOverrides
  >

export type DrawerFooterOwnerState<RootComponent extends ElementType = 'div'> =
  DrawerFooterOwnProps<RootComponent>
