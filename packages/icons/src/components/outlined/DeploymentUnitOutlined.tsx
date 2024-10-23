import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DeploymentUnit from '../../svg/outlined/deployment-unit.svg'
import type { IconProps } from '../../types'

export const DeploymentUnitOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DeploymentUnit, {
      className: 'deployment-unit-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
