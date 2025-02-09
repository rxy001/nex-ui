'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ConsoleSql from '../../svg/outlined/console-sql.svg'
import type { IconProps } from '../../types'

export const ConsoleSqlOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ConsoleSql, { className: 'console-sql-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ConsoleSqlOutlined.displayName = 'ConsoleSqlOutlined'
