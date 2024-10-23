import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Unlock from '../../svg/outlined/unlock.svg'
import type { IconProps } from '../../types'

export const UnlockOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Unlock, { className: 'unlock-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
