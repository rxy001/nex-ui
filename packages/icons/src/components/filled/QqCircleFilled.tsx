import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import QqCircle from '../../svg/filled/qq-circle.svg'
import type { IconProps } from '../../types'

export const QqCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(QqCircle, { className: 'qq-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

QqCircleFilled.displayName = 'QqCircleFilled'
