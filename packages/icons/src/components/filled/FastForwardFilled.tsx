import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FastForward from '../../svg/filled/fast-forward.svg'
import type { IconProps } from '../../types'

export const FastForwardFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FastForward)
    return <Icon {...props} ref={ref} />
  },
)
