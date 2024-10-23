import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Laptop from '../../svg/outlined/laptop.svg'
import type { IconProps } from '../../types'

export const LaptopOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Laptop, { className: 'laptop-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
