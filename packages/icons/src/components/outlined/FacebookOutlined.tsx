'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Facebook from '../../svg/outlined/facebook.svg'
import type { IconProps } from '../../types'

export const FacebookOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Facebook, { className: 'facebook-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FacebookOutlined.displayName = 'FacebookOutlined'
