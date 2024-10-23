import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FullscreenExit from '../../svg/outlined/fullscreen-exit.svg'
import type { IconProps } from '../../types'

export const FullscreenExitOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FullscreenExit, {
      className: 'fullscreen-exit-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
