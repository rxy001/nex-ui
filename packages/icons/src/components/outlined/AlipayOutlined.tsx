import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Alipay from '../../svg/outlined/alipay.svg'
import type { IconProps } from '../../types'

export const AlipayOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Alipay, { className: 'alipay-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
