import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Home from '../../svg/outlined/home.svg'
import type { IconProps } from '../../types'

export const HomeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Home, { className: 'home-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

HomeOutlined.displayName = 'HomeOutlined'
