import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlipayCircle from '../../svg/outlined/alipay-circle.svg'
import type { IconProps } from '../../types'

export const AlipayCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AlipayCircle, {
      className: 'alipay-circle-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
