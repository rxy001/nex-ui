import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ConsoleSql from '../../svg/outlined/console-sql.svg'
import type { IconProps } from '../../types'

export const ConsoleSqlOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ConsoleSql, { className: 'console-sql-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
