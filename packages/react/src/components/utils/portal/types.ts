import { ReactNode } from 'react'

export interface PortalProps {
  container?: Element | (() => Element | null) | null
  children?: ReactNode
}
