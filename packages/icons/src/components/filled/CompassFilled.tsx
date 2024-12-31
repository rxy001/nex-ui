import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Compass from '../../svg/filled/compass.svg'
import type { IconProps } from '../../types'

export const CompassFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Compass, { className: 'compass-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CompassFilled.displayName = 'CompassFilled'
