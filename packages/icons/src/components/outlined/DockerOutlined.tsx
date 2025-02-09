'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Docker from '../../svg/outlined/docker.svg'
import type { IconProps } from '../../types'

export const DockerOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Docker, { className: 'docker-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DockerOutlined.displayName = 'DockerOutlined'
