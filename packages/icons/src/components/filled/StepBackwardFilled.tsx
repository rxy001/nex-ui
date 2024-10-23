import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import StepBackward from '../../svg/filled/step-backward.svg'
import type { IconProps } from '../../types'

export const StepBackwardFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(StepBackward, { className: 'step-backward-filled' })
    return <Icon {...props} ref={ref} />
  },
)
