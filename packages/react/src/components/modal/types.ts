import type { Interpolation } from '@nex-ui/system'
import type { ClassValue } from 'clsx'
import type { DOMMotionComponents } from 'motion/react'
import type { Overwrite } from '../../types/utils'
import type { ComponentProps, ElementType, ReactNode } from 'react'
import type { PortalProps } from '../utils'

type ModalSlotProps<RootComponent extends ElementType> = Overwrite<
  ComponentProps<RootComponent>,
  {
    as?: RootComponent
    sx?: Interpolation
    className?: ClassValue
  }
>

// ------------- Modal --------------
export type ModalProps = {
  children?: ReactNode

  /**
   * If true, the Modal is shown. (controlled)
   */
  open?: boolean

  /**
   * If true, the Modal is shown by default. (uncontrolled)
   */
  defaultOpen?: boolean

  /**
   * Handler that is called when the Modal is opened or closed
   */
  onOpenChange?: (open: boolean) => void

  /**
   * If true, closes the Modal when the outside is clicked.
   * @default true
   */
  closeOnInteractOutside?: boolean

  /**
   * If true, the Modal prevents page scrolling.
   * @default false
   */
  preventScroll?: boolean

  /**
   * If true, closes the Modal when the escape key is pressed.
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * If true, the Modal will restore focus to previously focused element once the Modal is hidden or unmounted.
   * @default true
   */
  restoreFocus?: boolean

  /**
   * Callback function that is called when the Modal is closed.
   */
  onClose?: () => void
}

// ------------- ModalTrigger -------------
export interface ModalTriggerProps {
  children?: ReactNode
}

// ------------- ModalClose -------------
export interface ModalCloseProps {
  children?: ReactNode
}

// ------------- ModalContent -------------
export type ModalContentProps<RootComponent extends ElementType = 'section'> =
  ModalSlotProps<RootComponent>

// ------------- ModalHeader -------------
export type ModalHeaderProps<RootComponent extends ElementType = 'h2'> =
  ModalSlotProps<RootComponent>

// ------------- ModalBody -------------
export type ModalBodyProps<RootComponent extends ElementType = 'div'> =
  ModalSlotProps<RootComponent>

// ------------- ModalFooter -------------
export type ModalFooterProps<RootComponent extends ElementType = 'div'> =
  ModalSlotProps<RootComponent>

// ------------- ModalRoot -------------
export type ModalRootProps<RootComponent extends ElementType = 'div'> =
  ModalSlotProps<RootComponent>

// ------------- ModalBackdrop -------------
export type ModalBackdropProps<RootComponent extends ElementType = 'div'> =
  ModalSlotProps<RootComponent>

// ------------- ModalPanel -------------
export type ModalPanelProps<RootComponent extends ElementType = 'div'> =
  ModalSlotProps<RootComponent>

// ------------- ModalPortal -------------
export type ModalPortalProps = Pick<PortalProps, 'container' | 'children'> & {
  /**
   * If true, keeps the Modal mounted in the DOM when it's closed.
   *
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, disables the animation for the Modal.
   *
   * @default false
   */
  animateDisabled?: boolean
}

// ------------- ModalMotion -------------
export type ModalMotionProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = ModalSlotProps<RootComponent>
