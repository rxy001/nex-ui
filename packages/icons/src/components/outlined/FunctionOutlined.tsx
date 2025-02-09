'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Function from '../../svg/outlined/function.svg'
import type { IconProps } from '../../types'

export const FunctionOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Function, { className: 'function-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FunctionOutlined.displayName = 'FunctionOutlined'
