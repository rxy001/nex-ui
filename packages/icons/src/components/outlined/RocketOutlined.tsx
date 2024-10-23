import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rocket from '../../svg/outlined/rocket.svg'
import type { IconProps } from '../../types'

export const RocketOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Rocket, { className: 'rocket-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
