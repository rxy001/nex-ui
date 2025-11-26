import type { ReactNode } from 'react'

export interface PortalProps {
  container?: HTMLElement | (() => HTMLElement | null) | null
  children?: ReactNode
  onMount?: () => void
  onUnmount?: () => void
}
