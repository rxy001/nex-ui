import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shake from '../../svg/outlined/shake.svg'
import type { IconProps } from '../../types'

export const ShakeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Shake, { className: 'shake-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
