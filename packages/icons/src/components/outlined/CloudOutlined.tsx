'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Cloud from '../../svg/outlined/cloud.svg'
import type { IconProps } from '../../types'

export const CloudOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Cloud, { className: 'cloud-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CloudOutlined.displayName = 'CloudOutlined'
