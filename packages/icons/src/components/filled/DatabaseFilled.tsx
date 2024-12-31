import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Database from '../../svg/filled/database.svg'
import type { IconProps } from '../../types'

export const DatabaseFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Database, { className: 'database-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DatabaseFilled.displayName = 'DatabaseFilled'
