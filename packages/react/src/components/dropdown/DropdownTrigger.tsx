'use client'

import { MenuTrigger } from '../menu'
import type { DropdownTriggerProps } from './types'

export function DropdownTrigger(props: DropdownTriggerProps) {
  return <MenuTrigger {...props} />
}

DropdownTrigger.displayName = 'DropdownTrigger'
