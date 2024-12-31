import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Experiment from '../../svg/outlined/experiment.svg'
import type { IconProps } from '../../types'

export const ExperimentOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Experiment, { className: 'experiment-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ExperimentOutlined.displayName = 'ExperimentOutlined'
