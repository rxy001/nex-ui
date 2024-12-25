import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import StepForward from '../../svg/filled/step-forward.svg'
import type { IconProps } from '../../types'

export const StepForwardFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(StepForward, { className: 'step-forward-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
