'use client'

import { forwardRef, useMemo } from 'react'
import { createIcon } from './createIcon'
import type { IconProps } from './types'

export const Icon = forwardRef<SVGElement, IconProps>((inProps, ref) => {
  const { component, ...props } = inProps

  const InnerIcon = useMemo(() => createIcon(component), [component])

  return <InnerIcon {...props} ref={ref} />
})

Icon.displayName = 'Icon'
