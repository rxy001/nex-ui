import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Verified from '../../svg/outlined/verified.svg'
import type { IconProps } from '../../types'

export const VerifiedOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Verified, { className: 'verified-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
