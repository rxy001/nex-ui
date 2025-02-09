'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dingding from '../../svg/outlined/dingding.svg'
import type { IconProps } from '../../types'

export const DingdingOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Dingding, { className: 'dingding-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DingdingOutlined.displayName = 'DingdingOutlined'
