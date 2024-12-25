import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DeploymentUnit from '../../svg/outlined/deployment-unit.svg'
import type { IconProps } from '../../types'

export const DeploymentUnitOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(DeploymentUnit, { className: 'deployment-unit-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
