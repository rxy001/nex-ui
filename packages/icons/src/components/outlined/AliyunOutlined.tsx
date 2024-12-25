import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Aliyun from '../../svg/outlined/aliyun.svg'
import type { IconProps } from '../../types'

export const AliyunOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Aliyun, { className: 'aliyun-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
