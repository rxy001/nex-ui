import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shopping from '../../svg/outlined/shopping.svg'
import type { IconProps } from '../../types'

export const ShoppingOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Shopping, { className: 'shopping-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
