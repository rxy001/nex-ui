import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Baidu from '../../svg/outlined/baidu.svg'
import type { IconProps } from '../../types'

export const BaiduOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Baidu, { className: 'baidu-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BaiduOutlined.displayName = 'BaiduOutlined'
