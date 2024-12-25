import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Environment from '../../svg/outlined/environment.svg'
import type { IconProps } from '../../types'

export const EnvironmentOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Environment, { className: 'environment-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
