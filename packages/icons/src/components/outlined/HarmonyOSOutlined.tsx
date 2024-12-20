import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import HarmonyOS from '../../svg/outlined/harmony-o-s.svg'
import type { IconProps } from '../../types'

export const HarmonyOSOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(HarmonyOS, { className: 'harmony-o-s-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
