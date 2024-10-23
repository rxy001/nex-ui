import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Database from '../../svg/filled/database.svg'
import type { IconProps } from '../../types'

export const DatabaseFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Database, { className: 'database-filled' })
    return <Icon {...props} ref={ref} />
  },
)
