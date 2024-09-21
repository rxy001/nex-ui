import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FastBackward from '../../svg/filled/fast-backward.svg'
import type { IconProps } from '../../types'

export const FastBackwardFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FastBackward)
    return <Icon {...props} ref={ref} />
  },
)
