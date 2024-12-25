import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlipayCircle from '../../svg/outlined/alipay-circle.svg'
import type { IconProps } from '../../types'

export const AlipayCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AlipayCircle, { className: 'alipay-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
