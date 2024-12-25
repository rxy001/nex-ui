import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shopping from '../../svg/filled/shopping.svg'
import type { IconProps } from '../../types'

export const ShoppingFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Shopping, { className: 'shopping-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
