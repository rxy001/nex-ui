import type { ReactElement } from 'react'

export type FocusOutsideEvent = CustomEvent<{
  originalEvent: FocusEvent
}>

export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent
}>

export type EscapeKeyDownEvent = CustomEvent<{
  originalEvent: KeyboardEvent
}>

export interface DismissibleLayerProps {
  children: ReactElement<{}>
  onEscapeKeyDown?: (event: EscapeKeyDownEvent) => void
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void
  onFocusOutside?: (event: FocusOutsideEvent) => void
  onInteractOutside?: (
    event: PointerDownOutsideEvent | FocusOutsideEvent,
  ) => void
  onDismiss?: () => void
}
