import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rocket from '../../svg/filled/rocket.svg'
import type { IconProps } from '../../types'

export const RocketFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Rocket, { className: 'rocket-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
