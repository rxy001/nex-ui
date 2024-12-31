import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fullscreen from '../../svg/outlined/fullscreen.svg'
import type { IconProps } from '../../types'

export const FullscreenOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Fullscreen, { className: 'fullscreen-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FullscreenOutlined.displayName = 'FullscreenOutlined'
