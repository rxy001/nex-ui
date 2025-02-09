'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Up from '../../svg/outlined/up.svg'
import type { IconProps } from '../../types'

export const UpOutlined = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Up, { className: 'up-outlined' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

UpOutlined.displayName = 'UpOutlined'
