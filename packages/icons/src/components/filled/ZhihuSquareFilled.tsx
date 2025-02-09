'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ZhihuSquare from '../../svg/filled/zhihu-square.svg'
import type { IconProps } from '../../types'

export const ZhihuSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ZhihuSquare, { className: 'zhihu-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ZhihuSquareFilled.displayName = 'ZhihuSquareFilled'
