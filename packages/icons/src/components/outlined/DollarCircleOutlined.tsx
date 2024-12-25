import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DollarCircle from '../../svg/outlined/dollar-circle.svg'
import type { IconProps } from '../../types'

export const DollarCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DollarCircle, { className: 'dollar-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
