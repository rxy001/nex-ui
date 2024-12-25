import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import TaobaoSquare from '../../svg/filled/taobao-square.svg'
import type { IconProps } from '../../types'

export const TaobaoSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(TaobaoSquare, { className: 'taobao-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
