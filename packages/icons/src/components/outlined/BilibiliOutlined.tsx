import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bilibili from '../../svg/outlined/bilibili.svg'
import type { IconProps } from '../../types'

export const BilibiliOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Bilibili, { className: 'bilibili-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
