import type { PortalProps } from '@nex-ui/utils'
import type { HTMLMotionProps, SlotProps } from '../../types/utils'
import type { ElementType, ReactNode, ReactElement } from 'react'
import type { DismissibleLayerProps } from '../dismissibleLayer'
import type { FocusTrapProps } from '../focusTrap'

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
    onClick?: () => void | Promise<void>
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

export type ModalContentProps<RootComponent extends ElementType = 'section'> =
  SlotProps<RootComponent, ModalContentOwnProps>

// ------------- ModalHeader -------------
export type ModalHeaderProps<RootComponent extends ElementType = 'h2'> =
  SlotProps<RootComponent>

// ------------- ModalBody -------------
export type ModalBodyProps<RootComponent extends ElementType = 'div'> =
  SlotProps<RootComponent>

// ------------- ModalFooter -------------
export type ModalFooterProps<RootComponent extends ElementType = 'div'> =
  SlotProps<RootComponent>

// ------------- ModalRoot -------------
type ModalRootOwnProps = {
  /**
   * If true, the Modal prevents page scrolling.
   * @default false
   */
  preventScroll?: boolean
}

export type ModalRootProps<RootComponent extends ElementType = 'div'> =
  SlotProps<RootComponent, ModalRootOwnProps>

// ------------- ModalBackdrop -------------
export type ModalBackdropProps<RootComponent extends ElementType = 'div'> =
  SlotProps<RootComponent>

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
