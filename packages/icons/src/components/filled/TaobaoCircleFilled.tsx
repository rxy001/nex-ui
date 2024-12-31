import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import TaobaoCircle from '../../svg/filled/taobao-circle.svg'
import type { IconProps } from '../../types'

export const TaobaoCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(TaobaoCircle, { className: 'taobao-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TaobaoCircleFilled.displayName = 'TaobaoCircleFilled'
