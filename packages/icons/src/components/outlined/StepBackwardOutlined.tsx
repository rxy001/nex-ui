import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import StepBackward from '../../svg/outlined/step-backward.svg'
import type { IconProps } from '../../types'

export const StepBackwardOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(StepBackward, {
      className: 'step-backward-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
