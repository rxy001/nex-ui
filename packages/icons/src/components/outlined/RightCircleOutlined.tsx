import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RightCircle from '../../svg/outlined/right-circle.svg'
import type { IconProps } from '../../types'

export const RightCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RightCircle, { className: 'right-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RightCircleOutlined.displayName = 'RightCircleOutlined'
