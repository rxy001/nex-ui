import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Backward from '../../svg/filled/backward.svg'
import type { IconProps } from '../../types'

export const BackwardFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Backward, { className: 'backward-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
