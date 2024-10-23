import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Database from '../../svg/outlined/database.svg'
import type { IconProps } from '../../types'

export const DatabaseOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Database, { className: 'database-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
