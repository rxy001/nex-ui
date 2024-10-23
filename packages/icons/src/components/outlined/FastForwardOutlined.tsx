import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FastForward from '../../svg/outlined/fast-forward.svg'
import type { IconProps } from '../../types'

export const FastForwardOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FastForward, { className: 'fast-forward-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
