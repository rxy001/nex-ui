'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Holder from '../../svg/outlined/holder.svg'
import type { IconProps } from '../../types'

export const HolderOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Holder, { className: 'holder-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

HolderOutlined.displayName = 'HolderOutlined'
