import type { PortalProps } from '@nex-ui/utils'
import type { ReactNode, ReactElement, MouseEvent } from 'react'
import type { HTMLMotionProps } from 'motion/react'
import type { DismissibleLayerProps } from '../dismissibleLayer'
import type { FocusTrapProps } from '../focusTrap'
import type { SlotProps } from '../../types/utils'

// ------------- Modal --------------
export interface ModalProps {
  children?: ReactNode

  /**
   * If true, the Modal is shown. (controlled)
   */
  open?: boolean

  /**
   * Callback fired when the Modal is opened or closed
   */
  onOpenChange?: (open: boolean) => void

  /**
   * Callback function that is called when the Modal is closed.
   */
  onClose?: () => void
}

// ------------- ModalTrigger -------------
export interface ModalTriggerProps {
  children?: ReactElement<{}>
}

// ------------- ModalClose -------------
export interface ModalCloseProps {
  children?: ReactElement<{
    onClick?: (event: MouseEvent) => void | Promise<void>
    'aria-label'?: string
  }>
}

// ------------- ModalHeader -------------
export interface ModalHeaderProps extends SlotProps<'h2'> {}

// ------------- ModalBody -------------
export interface ModalBodyProps extends SlotProps<'div'> {}

// ------------- ModalFooter -------------
export interface ModalFooterProps extends SlotProps<'div'> {}

// ------------- ModalContent -------------
type ModalContentOwnProps = Pick<FocusTrapProps, 'restoreFocus' | 'autoFocus'> &
  Omit<DismissibleLayerProps, 'children' | 'onDismiss'> & {
    /**
     * If true, closes the Modal when the escape key is pressed.
     * @default true
     */
    closeOnEscape?: boolean

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
  }

export interface ModalContentProps
  extends SlotProps<'div', ModalContentOwnProps> {}

// ------------- ModalBackdrop -------------
export interface ModalBackdropProps extends SlotProps<'div'> {}

// ------------- ModalPortal -------------
export interface ModalPortalProps extends PortalProps {
  /**
   * If true, keeps the Modal mounted in the DOM.
   *
   * @default false
   */
  forceMount?: boolean
}

// ------------- ModalMotion -------------
export interface ModalMotionProps extends HTMLMotionProps<'div'> {}
