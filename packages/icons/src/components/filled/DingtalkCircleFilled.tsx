import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DingtalkCircle from '../../svg/filled/dingtalk-circle.svg'
import type { IconProps } from '../../types'

export const DingtalkCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DingtalkCircle, {
      className: 'dingtalk-circle-filled',
    })
    return <Icon {...props} ref={ref} />
  },
)
