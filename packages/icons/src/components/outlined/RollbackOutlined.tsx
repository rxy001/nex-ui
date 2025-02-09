'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rollback from '../../svg/outlined/rollback.svg'
import type { IconProps } from '../../types'

export const RollbackOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Rollback, { className: 'rollback-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RollbackOutlined.displayName = 'RollbackOutlined'
