import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import TaobaoCircle from '../../svg/outlined/taobao-circle.svg'
import type { IconProps } from '../../types'

export const TaobaoCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(TaobaoCircle, { className: 'taobao-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TaobaoCircleOutlined.displayName = 'TaobaoCircleOutlined'
