'use client'

import { PopperMotion } from '../popper'
import type { MenuMotionProps } from './types'

export const MenuMotion = (props: MenuMotionProps) => (
  <PopperMotion {...props} />
)

MenuMotion.displayName = 'MenuMotion'
