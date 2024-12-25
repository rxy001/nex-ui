import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Laptop from '../../svg/outlined/laptop.svg'
import type { IconProps } from '../../types'

export const LaptopOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Laptop, { className: 'laptop-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
