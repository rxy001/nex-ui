import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import AntCloud from '../../svg/outlined/ant-cloud.svg'
import type { IconProps } from '../../types'

export const AntCloudOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(AntCloud, { className: 'ant-cloud-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AntCloudOutlined.displayName = 'AntCloudOutlined'
