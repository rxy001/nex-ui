import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import StepForward from '../../svg/filled/step-forward.svg'
import type { IconProps } from '../../types'

export const StepForwardFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(StepForward, { className: 'step-forward-filled' })
    return <Icon {...props} ref={ref} />
  },
)
