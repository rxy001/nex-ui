import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlipayCircle from '../../svg/filled/alipay-circle.svg'
import type { IconProps } from '../../types'

export const AlipayCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AlipayCircle, { className: 'alipay-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
