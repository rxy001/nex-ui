import type { ReactNode } from 'react'

export interface PortalProps {
  container?: Element | (() => Element | null) | null
  children?: ReactNode
  onMount?: () => void
  onUnmount?: () => void
}
