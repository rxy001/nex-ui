import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PauseCircle from '../../svg/filled/pause-circle.svg'
import type { IconProps } from '../../types'

export const PauseCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PauseCircle, { className: 'pause-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
