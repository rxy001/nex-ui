import type { ReactNode } from 'react'

export type PopupProps = {
  children?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export type PopupTriggerProps = {
  children?: ReactNode
}

export type PopupPortalProps = {
  children?: ReactNode
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
}
