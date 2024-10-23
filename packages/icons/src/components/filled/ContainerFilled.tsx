import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Container from '../../svg/filled/container.svg'
import type { IconProps } from '../../types'

export const ContainerFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Container, { className: 'container-filled' })
    return <Icon {...props} ref={ref} />
  },
)
