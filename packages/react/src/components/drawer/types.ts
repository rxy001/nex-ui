import type { ElementType, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { HTMLMotionProps } from 'motion/react'
import type { DrawerContentVariants } from '../../theme/recipes'
import type {
  OverrideProps,
  SlotProps,
  ComponentSlotClasses,
} from '../../types/utils'
import type {
  ModalCloseProps,
  ModalContentProps,
  ModalPortalProps,
  ModalTriggerProps,
  ModalProps,
} from '../modal'

// ----------------Drawer----------------
type DrawerOwnProps = ModalProps & {
  /**
   * If true, the Drawer is shown by default. (uncontrolled)
   */
  defaultOpen?: boolean
}

export interface DrawerPropsOverrides {}

export type DrawerProps = DrawerOwnProps & DrawerPropsOverrides

// ----------------DrawerContent----------------
type DrawerContentSlotProps = {
  closeButton?: SlotProps<'button'>
  backdrop?: SlotProps<'div'>
  paper?: SlotProps<'div'>
}

export interface DrawerContentPropsOverrides {}

type DrawerContentOwnProps<RootComponent extends ElementType = 'div'> = Pick<
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
     * The className used for each slot.
     */
    classNames?: ComponentSlotClasses<keyof DrawerContentSlotProps>

    /**
     * It's usually the DrawerHeader、DrawerBody and DrawerFooter component.
     */
    children?: ReactNode

    /**
     * If true, disables the animation for the Drawer.
     *
     * @default false
     */
    disableAnimation?: boolean

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
     * If true, the backdrop is not rendered.
     *
     * @default false
     */
    hideBackdrop?: boolean

    /**
     * If true, keeps the Drawer mounted in the DOM when it's closed.
     *
     * @default false
     */
    keepMounted?: boolean

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
   * The component or element to render as the root.
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

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
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
   * The component or element to render as the root.
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

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
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
   * The component or element to render as the root.
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

  /**
   * Additional class names to apply to the root.
   */
  className?: ClassValue
}

export type DrawerFooterProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
    RootComponent,
    DrawerFooterOwnProps<RootComponent>,
    DrawerFooterPropsOverrides
  >

export interface DrawerTriggerProps extends ModalTriggerProps {}

export interface DrawerCloseProps extends ModalCloseProps {}

export type DrawerPaperMotionProps = {
  children: ReactNode
  placement: DrawerContentVariants['placement']
  motionProps?: DrawerContentOwnProps['motionProps']
}
