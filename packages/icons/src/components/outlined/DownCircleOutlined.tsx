import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DownCircle from '../../svg/outlined/down-circle.svg'
import type { IconProps } from '../../types'

export const DownCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DownCircle, { className: 'down-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DownCircleOutlined.displayName = 'DownCircleOutlined'
