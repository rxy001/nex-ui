import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Mobile from '../../svg/outlined/mobile.svg'
import type { IconProps } from '../../types'

export const MobileOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Mobile, { className: 'mobile-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
