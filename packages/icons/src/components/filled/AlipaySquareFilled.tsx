import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import AlipaySquare from '../../svg/filled/alipay-square.svg'
import type { IconProps } from '../../types'

export const AlipaySquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(AlipaySquare)
    return <Icon {...props} ref={ref} />
  },
)
