import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ZhihuSquare from '../../svg/filled/zhihu-square.svg'
import type { IconProps } from '../../types'

export const ZhihuSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ZhihuSquare)
    return <Icon {...props} ref={ref} />
  },
)
