import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ZhihuCircle from '../../svg/filled/zhihu-circle.svg'
import type { IconProps } from '../../types'

export const ZhihuCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ZhihuCircle, { className: 'zhihu-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
