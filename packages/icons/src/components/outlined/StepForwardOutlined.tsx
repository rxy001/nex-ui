import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import StepForward from '../../svg/outlined/step-forward.svg'
import type { IconProps } from '../../types'

export const StepForwardOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(StepForward, { className: 'step-forward-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
