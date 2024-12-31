import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import StepBackward from '../../svg/filled/step-backward.svg'
import type { IconProps } from '../../types'

export const StepBackwardFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(StepBackward, { className: 'step-backward-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

StepBackwardFilled.displayName = 'StepBackwardFilled'
