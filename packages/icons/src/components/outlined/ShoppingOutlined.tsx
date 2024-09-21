import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shopping from '../../svg/outlined/shopping.svg'
import type { IconProps } from '../../types'

export const ShoppingOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Shopping)
    return <Icon {...props} ref={ref} />
  },
)
