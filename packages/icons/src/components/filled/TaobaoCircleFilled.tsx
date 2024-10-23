import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import TaobaoCircle from '../../svg/filled/taobao-circle.svg'
import type { IconProps } from '../../types'

export const TaobaoCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(TaobaoCircle, { className: 'taobao-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
