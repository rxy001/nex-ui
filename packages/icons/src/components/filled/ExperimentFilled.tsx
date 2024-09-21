import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Experiment from '../../svg/filled/experiment.svg'
import type { IconProps } from '../../types'

export const ExperimentFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Experiment)
    return <Icon {...props} ref={ref} />
  },
)
