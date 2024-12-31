import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DingtalkCircle from '../../svg/filled/dingtalk-circle.svg'
import type { IconProps } from '../../types'

export const DingtalkCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DingtalkCircle, { className: 'dingtalk-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DingtalkCircleFilled.displayName = 'DingtalkCircleFilled'
