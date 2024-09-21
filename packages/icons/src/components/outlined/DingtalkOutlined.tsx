import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dingtalk from '../../svg/outlined/dingtalk.svg'
import type { IconProps } from '../../types'

export const DingtalkOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Dingtalk)
    return <Icon {...props} ref={ref} />
  },
)
