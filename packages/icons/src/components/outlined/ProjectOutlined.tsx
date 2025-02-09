'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Project from '../../svg/outlined/project.svg'
import type { IconProps } from '../../types'

export const ProjectOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Project, { className: 'project-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ProjectOutlined.displayName = 'ProjectOutlined'
