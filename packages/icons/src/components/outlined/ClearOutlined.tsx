import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Clear from '../../svg/outlined/clear.svg'
import type { IconProps } from '../../types'

export const ClearOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Clear, { className: 'clear-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
