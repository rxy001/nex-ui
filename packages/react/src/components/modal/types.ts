import type { Interpolation } from '@nex-ui/system'
import type { Overwrite } from '../../types/utils'
import type { ComponentProps, ElementType, ReactNode } from 'react'
import type * as m from 'motion/react-m'

type ModalSlotProps<RootComponent extends ElementType> = Overwrite<
  ComponentProps<RootComponent>,
  {
    as?: RootComponent
    sx?: Interpolation
  }
>

// ------------- Modal --------------
export type ModalProps = {
  children?: ReactNode

  /**
   * If true, the component is shown.(controlled)
   */
  open?: boolean

  /**
   * If true, the component is shown by default
   */
  defaultOpen?: boolean

  /**
   * Handler that is called when the modal is opened or closed
   */
  onOpenChange?: (open: boolean) => void

  /**
   * The container element in which the overlay portal will be placed.
   * @default document.body
   */
  container?: Element | null | (() => Element | null)

  /**
   * Always keep the children in the DOM.
   * @default false
   */
  keepMounted?: boolean

  /**
   * If true, close the modal when the outside is clicked.
   * @default true
   */
  closeOnInteractOutside?: boolean

  /**
   * If true, the modal prevents page scrolling.
   * @default false
   */
  preventScroll?: boolean

  /**
   * close the modal when the escape key is pressed
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * If true, the modal will restore focus to previously focused element once the modal is hidden or unmounted.
   * @default true
   */
  restoreFocus?: boolean

  /**
   * The id(s) of the element(s) that describe the modal.
   */
  'aria-labelledby'?: string

  /**
   * The id(s) of the element(s) that label the modal.
   */
  'aria-describedby'?: string
}

// ------------- ModalTrigger -------------
export type ModalTriggerProps = {
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

// ModalRoot
export type ModalRootProps<RootComponent extends ElementType = typeof m.div> =
  ModalSlotProps<RootComponent>

// ModalBackdrop
export type ModalBackdropProps<RootComponent extends ElementType = 'div'> =
  ModalSlotProps<RootComponent>

// ModalPanel
export type ModalPanelProps<RootComponent extends ElementType = 'div'> =
  ModalSlotProps<RootComponent>
