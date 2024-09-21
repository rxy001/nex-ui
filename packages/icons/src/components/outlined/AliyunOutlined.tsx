import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Aliyun from '../../svg/outlined/aliyun.svg'
import type { IconProps } from '../../types'

export const AliyunOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Aliyun)
    return <Icon {...props} ref={ref} />
  },
)
