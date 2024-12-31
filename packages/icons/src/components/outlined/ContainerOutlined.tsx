import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Container from '../../svg/outlined/container.svg'
import type { IconProps } from '../../types'

export const ContainerOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Container, { className: 'container-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ContainerOutlined.displayName = 'ContainerOutlined'
