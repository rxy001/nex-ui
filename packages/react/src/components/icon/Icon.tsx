'use client'

import { useMemo } from 'react'
import type { ElementType, Ref } from 'react'
import { createIcon } from './createIcon'
import { forwardRef } from '../utils'
import type { IconProps } from './types'

export const Icon = forwardRef(
  <RootComponent extends ElementType = 'svg'>(
    inProps: IconProps<RootComponent>,
    ref: Ref<SVGSVGElement>,
  ) => {
    const { component, ...props } = inProps

    const InnerIcon = useMemo(() => createIcon(component), [component])

    // @ts-ignore
    return <InnerIcon {...props} ref={ref} />
  },
)

Icon.displayName = 'Icon'
