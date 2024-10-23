import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pause from '../../svg/outlined/pause.svg'
import type { IconProps } from '../../types'

export const PauseOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Pause, { className: 'pause-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
