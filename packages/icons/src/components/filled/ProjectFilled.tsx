import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Project from '../../svg/filled/project.svg'
import type { IconProps } from '../../types'

export const ProjectFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Project, { className: 'project-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ProjectFilled.displayName = 'ProjectFilled'
