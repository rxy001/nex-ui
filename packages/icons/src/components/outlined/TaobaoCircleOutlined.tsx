import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import TaobaoCircle from '../../svg/outlined/taobao-circle.svg'
import type { IconProps } from '../../types'

export const TaobaoCircleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(TaobaoCircle, {
      className: 'taobao-circle-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
