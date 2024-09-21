import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Close from '../../svg/outlined/close.svg'
import type { IconProps } from '../../types'

export const CloseOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Close)
    return <Icon {...props} ref={ref} />
  },
)
