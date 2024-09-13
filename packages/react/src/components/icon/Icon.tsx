'use client'

import { __NEX_ICONS_CREATE_ICON } from '@nex-ui/icons'
import type { IconProps } from './types'

export function Icon(inProps: IconProps) {
  const { component, ...props } = inProps

  const InnerIcon = __NEX_ICONS_CREATE_ICON(component)

  return <InnerIcon {...props} />
}

Icon.displayName = 'Icon'
