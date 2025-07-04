import type { Interpolation } from '@nex-ui/system'
import type { DOMMotionComponents } from 'motion/react'
import type { Overwrite } from '../../types/utils'
import type { ComponentProps, ElementType, ReactNode } from 'react'

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

  open?: boolean

  defaultOpen?: boolean

  onOpenChange?: (open: boolean) => void

  container?: Element | null | (() => Element | null)

  keepMounted?: boolean

  closeOnInteractBackdrop?: boolean

  hideCloseButton?: boolean
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
export type ModalContentProps<
  RootComponent extends ElementType = DOMMotionComponents['section'],
> = ModalSlotProps<RootComponent>

// ------------- ModalHeader -------------
export type ModalHeaderProps<
  RootComponent extends ElementType = DOMMotionComponents['h2'],
> = ModalSlotProps<RootComponent>

// ------------- ModalBody -------------
export type ModalBodyProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = ModalSlotProps<RootComponent>

// ------------- ModalFooter -------------
export type ModalFooterProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = ModalSlotProps<RootComponent>

// ModalRoot
export type ModalRootProps<RootComponent extends ElementType = 'div'> =
  ModalSlotProps<RootComponent>

// ModalBackdrop
export type ModalBackdropProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = ModalSlotProps<RootComponent>

// ModalPanel
export type ModalPanelProps<
  RootComponent extends ElementType = DOMMotionComponents['div'],
> = ModalSlotProps<RootComponent>
