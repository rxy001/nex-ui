'use client'

import { Icon as OriginalIcon } from '@iconify/react'
import type { IconProps } from './types'

export function Icon(props: IconProps) {
  return <OriginalIcon width="1em" height="1em" {...props} />
}
