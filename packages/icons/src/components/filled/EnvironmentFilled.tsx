import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Environment from '../../svg/filled/environment.svg'
import type { IconProps } from '../../types'

export const EnvironmentFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Environment, { className: 'environment-filled' })
    return <Icon {...props} ref={ref} />
  },
)
