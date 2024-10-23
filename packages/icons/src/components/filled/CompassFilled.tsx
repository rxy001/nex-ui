import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Compass from '../../svg/filled/compass.svg'
import type { IconProps } from '../../types'

export const CompassFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Compass, { className: 'compass-filled' })
    return <Icon {...props} ref={ref} />
  },
)
