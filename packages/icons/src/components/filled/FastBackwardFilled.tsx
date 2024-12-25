import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FastBackward from '../../svg/filled/fast-backward.svg'
import type { IconProps } from '../../types'

export const FastBackwardFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FastBackward, { className: 'fast-backward-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
