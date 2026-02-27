import type { PortalProps } from '@nex-ui/utils'
import type { ReactNode, ReactElement, MouseEvent } from 'react'
import type { DismissibleLayerProps } from '../dismissibleLayer'
import type { FocusTrapProps } from '../focusTrap'
import type { HTMLMotionProps, SlotProps } from '../../types/utils'

// ------------- Modal --------------
export type ModalProps = {
  children?: ReactNode

  /**
   * If true, the Modal is shown. (controlled)
   */
  open?: boolean

  /**
   * Handler that is called when the Modal is opened or closed
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

// ------------- ModalContent -------------
type ModalContentOwnProps = Omit<FocusTrapProps, 'children' | 'active'> &
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
  }

export type ModalContentProps = SlotProps<'section', ModalContentOwnProps>

// ------------- ModalHeader -------------
export type ModalHeaderProps = SlotProps<'h2'>

// ------------- ModalBody -------------
export type ModalBodyProps = SlotProps<'div'>

// ------------- ModalFooter -------------
export type ModalFooterProps = SlotProps<'div'>

// ------------- ModalRoot -------------
type ModalRootOwnProps = {
  /**
   * If true, the Modal prevents page scrolling.
   * @default false
   */
  preventScroll?: boolean
}

export type ModalRootProps = SlotProps<'div', ModalRootOwnProps>

// ------------- ModalBackdrop -------------
export type ModalBackdropProps = SlotProps<'div'>

// ------------- ModalPortal -------------
export type ModalPortalProps = PortalProps & {
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
  disablePresence?: boolean
}

// ------------- ModalMotion -------------
export type ModalMotionProps = HTMLMotionProps<'div'>
