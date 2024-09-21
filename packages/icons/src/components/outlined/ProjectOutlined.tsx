import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Project from '../../svg/outlined/project.svg'
import type { IconProps } from '../../types'

export const ProjectOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Project)
    return <Icon {...props} ref={ref} />
  },
)
