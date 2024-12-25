import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Forward from '../../svg/filled/forward.svg'
import type { IconProps } from '../../types'

export const ForwardFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Forward, { className: 'forward-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
