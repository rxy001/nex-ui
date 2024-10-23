import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowDown from '../../svg/outlined/arrow-down.svg'
import type { IconProps } from '../../types'

export const ArrowDownOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ArrowDown, { className: 'arrow-down-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
