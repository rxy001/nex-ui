import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Muted from '../../svg/filled/muted.svg'
import type { IconProps } from '../../types'

export const MutedFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Muted, { className: 'muted-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
