import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PauseCircle from '../../svg/outlined/pause-circle.svg'
import type { IconProps } from '../../types'

export const PauseCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PauseCircle, { className: 'pause-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PauseCircleOutlined.displayName = 'PauseCircleOutlined'
