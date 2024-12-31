import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CheckCircle from '../../svg/filled/check-circle.svg'
import type { IconProps } from '../../types'

export const CheckCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CheckCircle, { className: 'check-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CheckCircleFilled.displayName = 'CheckCircleFilled'
