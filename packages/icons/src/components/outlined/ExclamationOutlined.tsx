'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Exclamation from '../../svg/outlined/exclamation.svg'
import type { IconProps } from '../../types'

export const ExclamationOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Exclamation, { className: 'exclamation-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ExclamationOutlined.displayName = 'ExclamationOutlined'
