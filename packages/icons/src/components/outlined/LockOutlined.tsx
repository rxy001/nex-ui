import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Lock from '../../svg/outlined/lock.svg'
import type { IconProps } from '../../types'

export const LockOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Lock, { className: 'lock-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LockOutlined.displayName = 'LockOutlined'
