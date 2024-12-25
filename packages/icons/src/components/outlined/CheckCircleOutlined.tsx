import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CheckCircle from '../../svg/outlined/check-circle.svg'
import type { IconProps } from '../../types'

export const CheckCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CheckCircle, { className: 'check-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
