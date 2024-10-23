import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DingtalkSquare from '../../svg/filled/dingtalk-square.svg'
import type { IconProps } from '../../types'

export const DingtalkSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DingtalkSquare, {
      className: 'dingtalk-square-filled',
    })
    return <Icon {...props} ref={ref} />
  },
)
