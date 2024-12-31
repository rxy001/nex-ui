import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Environment from '../../svg/filled/environment.svg'
import type { IconProps } from '../../types'

export const EnvironmentFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Environment, { className: 'environment-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

EnvironmentFilled.displayName = 'EnvironmentFilled'
