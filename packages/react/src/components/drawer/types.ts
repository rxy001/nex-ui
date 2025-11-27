import type { DOMMotionComponents } from 'motion/react'
import type { ElementType, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { ModalProps } from '../modal'
import type { DrawerContentVariants } from '../../theme/recipes'
import type {
  OverrideProps,
  ComponentPropsWithCommonProps,
  ComponentSlotClasses,
  HTMLMotionProps,
} from '../../types/utils'
import type { ModalPortalProps } from '../modal/types'

// ----------------Drawer----------------
type DrawerSlotProps = {
  backdrop?: ComponentPropsWithCommonProps<'div'>
}

type DrawerOwnProps<RootComponent extends ElementType> = {
  /**
   * The component or element to render as the root.
   *
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
   * Additional class names to apply to the root.
   */
  className?: ClassValue

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
  classNames?: ComponentSlotClasses<keyof DrawerSlotProps>

  /**
   * If true, closes the drawer when the backdrop is clicked.
   * @default true
   */
  closeOnInteractBackdrop?: boolean

  /**
   * The props to modify the framer motion animation.
   * Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<'div'>
} & Omit<ModalProps, 'closeOnInteractOutside'> &
  Omit<ModalPortalProps, 'children'>

export interface DrawerPropsOverrides {}

export type DrawerProps<RootComponent extends ElementType = 'div'> =
  OverrideProps<
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
  classNames?: ComponentSlotClasses<'paper' | 'closeButton'>

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
