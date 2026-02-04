'use client'

import { PopperPortal } from '../popper'
import type { MenuPortalProps } from './types'

export const MenuPortal = (props: MenuPortalProps) => (
  <PopperPortal {...props} />
)

MenuPortal.displayName = 'MenuPortal'
