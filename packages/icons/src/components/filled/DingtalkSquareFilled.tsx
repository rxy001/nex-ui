import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DingtalkSquare from '../../svg/filled/dingtalk-square.svg'
import type { IconProps } from '../../types'

export const DingtalkSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DingtalkSquare, { className: 'dingtalk-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
