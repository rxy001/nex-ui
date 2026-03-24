'use client'

import { PopperPortal } from '../popper'
import type { MenuPortalProps } from './types'

export function MenuPortal(props: MenuPortalProps) {
  return <PopperPortal {...props} />
}

MenuPortal.displayName = 'MenuPortal'
