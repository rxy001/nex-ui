import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Border from '../../svg/outlined/border.svg'
import type { IconProps } from '../../types'

export const BorderOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Border, { className: 'border-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
