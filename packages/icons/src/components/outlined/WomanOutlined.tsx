'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Woman from '../../svg/outlined/woman.svg'
import type { IconProps } from '../../types'

export const WomanOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Woman, { className: 'woman-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WomanOutlined.displayName = 'WomanOutlined'
