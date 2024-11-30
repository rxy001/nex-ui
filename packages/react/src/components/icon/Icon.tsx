'use client'

import { forwardRef } from 'react'
import { createIcon } from './createIcon'
import type { IconProps } from './types'

export const Icon = forwardRef<SVGElement, IconProps>((inProps, ref) => {
  const { component, ...props } = inProps
  const InnerIcon = createIcon(component)
  return <InnerIcon {...props} ref={ref} />
})

Icon.displayName = 'Icon'
