import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import TaobaoSquare from '../../svg/filled/taobao-square.svg'
import type { IconProps } from '../../types'

export const TaobaoSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(TaobaoSquare, { className: 'taobao-square-filled' })
    return <Icon {...props} ref={ref} />
  },
)
