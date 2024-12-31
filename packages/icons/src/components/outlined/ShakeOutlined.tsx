import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shake from '../../svg/outlined/shake.svg'
import type { IconProps } from '../../types'

export const ShakeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Shake, { className: 'shake-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ShakeOutlined.displayName = 'ShakeOutlined'
