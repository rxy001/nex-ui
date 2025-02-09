'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fire from '../../svg/outlined/fire.svg'
import type { IconProps } from '../../types'

export const FireOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Fire, { className: 'fire-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FireOutlined.displayName = 'FireOutlined'
