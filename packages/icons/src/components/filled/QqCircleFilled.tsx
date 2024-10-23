import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import QqCircle from '../../svg/filled/qq-circle.svg'
import type { IconProps } from '../../types'

export const QqCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(QqCircle, { className: 'qq-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
