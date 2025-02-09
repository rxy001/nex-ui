'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CiCircle from '../../svg/outlined/ci-circle.svg'
import type { IconProps } from '../../types'

export const CiCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CiCircle, { className: 'ci-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CiCircleOutlined.displayName = 'CiCircleOutlined'
