import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Unlock from '../../svg/outlined/unlock.svg'
import type { IconProps } from '../../types'

export const UnlockOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Unlock, { className: 'unlock-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UnlockOutlined.displayName = 'UnlockOutlined'
