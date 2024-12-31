import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Database from '../../svg/outlined/database.svg'
import type { IconProps } from '../../types'

export const DatabaseOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Database, { className: 'database-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DatabaseOutlined.displayName = 'DatabaseOutlined'
