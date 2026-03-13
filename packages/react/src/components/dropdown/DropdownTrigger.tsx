'use client'

import { MenuTrigger } from '../menu'
import type { DropdownTriggerProps } from './types'

export const DropdownTrigger = (props: DropdownTriggerProps) => (
  <MenuTrigger {...props} />
)

DropdownTrigger.displayName = 'DropdownTrigger'
