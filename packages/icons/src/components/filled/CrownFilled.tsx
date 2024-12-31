import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Crown from '../../svg/filled/crown.svg'
import type { IconProps } from '../../types'

export const CrownFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Crown, { className: 'crown-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CrownFilled.displayName = 'CrownFilled'
