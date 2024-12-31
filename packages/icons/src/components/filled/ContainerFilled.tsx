import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Container from '../../svg/filled/container.svg'
import type { IconProps } from '../../types'

export const ContainerFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Container, { className: 'container-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ContainerFilled.displayName = 'ContainerFilled'
