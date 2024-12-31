import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Poweroff from '../../svg/outlined/poweroff.svg'
import type { IconProps } from '../../types'

export const PoweroffOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Poweroff, { className: 'poweroff-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PoweroffOutlined.displayName = 'PoweroffOutlined'
