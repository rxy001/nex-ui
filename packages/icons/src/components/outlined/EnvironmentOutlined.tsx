import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Environment from '../../svg/outlined/environment.svg'
import type { IconProps } from '../../types'

export const EnvironmentOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Environment)
    return <Icon {...props} ref={ref} />
  },
)
