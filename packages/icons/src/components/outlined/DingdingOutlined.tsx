import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dingding from '../../svg/outlined/dingding.svg'
import type { IconProps } from '../../types'

export const DingdingOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Dingding, { className: 'dingding-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
