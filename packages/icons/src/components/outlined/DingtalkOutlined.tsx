import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dingtalk from '../../svg/outlined/dingtalk.svg'
import type { IconProps } from '../../types'

export const DingtalkOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Dingtalk, { className: 'dingtalk-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
