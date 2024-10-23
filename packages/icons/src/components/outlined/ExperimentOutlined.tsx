import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Experiment from '../../svg/outlined/experiment.svg'
import type { IconProps } from '../../types'

export const ExperimentOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Experiment, { className: 'experiment-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
