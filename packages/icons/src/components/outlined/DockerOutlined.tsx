import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Docker from '../../svg/outlined/docker.svg'
import type { IconProps } from '../../types'

export const DockerOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Docker)
    return <Icon {...props} ref={ref} />
  },
)
