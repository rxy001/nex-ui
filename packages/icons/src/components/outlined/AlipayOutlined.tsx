'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Alipay from '../../svg/outlined/alipay.svg'
import type { IconProps } from '../../types'

export const AlipayOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Alipay, { className: 'alipay-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AlipayOutlined.displayName = 'AlipayOutlined'
