import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Container from '../../svg/outlined/container.svg'
import type { IconProps } from '../../types'

export const ContainerOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Container)
    return <Icon {...props} ref={ref} />
  },
)
