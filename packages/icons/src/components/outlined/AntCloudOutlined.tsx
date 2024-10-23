import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AntCloud from '../../svg/outlined/ant-cloud.svg'
import type { IconProps } from '../../types'

export const AntCloudOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AntCloud, { className: 'ant-cloud-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
