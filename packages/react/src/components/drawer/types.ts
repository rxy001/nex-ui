import type { DOMMotionComponents } from 'motion/react'
import type { ElementType, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { DrawerContentVariants } from '../../theme/recipes'
import type {
  OverrideProps,
  ComponentPropsWithCommonProps,
  ComponentUtilityClasses,
  HTMLMotionProps,
} from '../../types/utils'

// ----------------Drawer----------------
type DrawerSlotProps = {
  backdrop?: ComponentPropsWithCommonProps<'div'>
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
  sx?: Interpolation

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
  slotProps?: DrawerSlotProps

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'backdrop'>

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

  /**
   * Callback function that is called when the drawer is closed.
   */
  onClose?: () => void
}

export type DrawerOwnerState<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = DrawerOwnProps<RootComponent> & {
  setOpen: (open: boolean) => void
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
type DrawerContentSlotProps = {
  closeButton?: ComponentPropsWithCommonProps<'button'>
  paper?: ComponentPropsWithCommonProps<DOMMotionComponents['section']>
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
  sx?: Interpolation

  /**
   * The className used for each slot.
   */
  classes?: ComponentUtilityClasses<'paper' | 'closeButton'>

  /**
   * It's usually the DrawerHeader、DrawerBody andd DrawerFooter component.
   */
  children?: ReactNode

  /**
   * The props used for each slot.
   */
  slotProps?: DrawerContentSlotProps

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
  sx?: Interpolation

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
  sx?: Interpolation

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
  sx?: Interpolation

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
