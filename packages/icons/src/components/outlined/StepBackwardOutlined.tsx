import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import StepBackward from '../../svg/outlined/step-backward.svg'
import type { IconProps } from '../../types'

export const StepBackwardOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(StepBackward, { className: 'step-backward-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

StepBackwardOutlined.displayName = 'StepBackwardOutlined'
