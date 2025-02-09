'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Send from '../../svg/outlined/send.svg'
import type { IconProps } from '../../types'

export const SendOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Send, { className: 'send-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SendOutlined.displayName = 'SendOutlined'
