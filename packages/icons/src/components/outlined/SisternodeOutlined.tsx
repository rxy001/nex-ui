'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sisternode from '../../svg/outlined/sisternode.svg'
import type { IconProps } from '../../types'

export const SisternodeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Sisternode, { className: 'sisternode-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SisternodeOutlined.displayName = 'SisternodeOutlined'
