import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import HarmonyOS from '../../svg/outlined/harmony-o-s.svg'
import type { IconProps } from '../../types'

export const HarmonyOSOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(HarmonyOS, { className: 'harmony-o-s-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
