import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fullscreen from '../../svg/outlined/fullscreen.svg'
import type { IconProps } from '../../types'

export const FullscreenOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Fullscreen)
    return <Icon {...props} ref={ref} />
  },
)
