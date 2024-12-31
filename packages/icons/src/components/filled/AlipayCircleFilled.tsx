import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlipayCircle from '../../svg/filled/alipay-circle.svg'
import type { IconProps } from '../../types'

export const AlipayCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AlipayCircle, { className: 'alipay-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AlipayCircleFilled.displayName = 'AlipayCircleFilled'
