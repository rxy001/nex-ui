import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Coffee from '../../svg/outlined/coffee.svg'
import type { IconProps } from '../../types'

export const CoffeeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Coffee, { className: 'coffee-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
