import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rocket from '../../svg/outlined/rocket.svg'
import type { IconProps } from '../../types'

export const RocketOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Rocket, { className: 'rocket-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RocketOutlined.displayName = 'RocketOutlined'
