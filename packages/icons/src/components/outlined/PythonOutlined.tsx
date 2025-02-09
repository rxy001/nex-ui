'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Python from '../../svg/outlined/python.svg'
import type { IconProps } from '../../types'

export const PythonOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Python, { className: 'python-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PythonOutlined.displayName = 'PythonOutlined'
