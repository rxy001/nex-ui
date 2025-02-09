'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Experiment from '../../svg/filled/experiment.svg'
import type { IconProps } from '../../types'

export const ExperimentFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Experiment, { className: 'experiment-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ExperimentFilled.displayName = 'ExperimentFilled'
