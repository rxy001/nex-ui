import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Taobao from '../../svg/outlined/taobao.svg'
import type { IconProps } from '../../types'

export const TaobaoOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Taobao, { className: 'taobao-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
