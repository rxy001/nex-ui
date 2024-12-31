import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Control from '../../svg/filled/control.svg'
import type { IconProps } from '../../types'

export const ControlFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Control, { className: 'control-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ControlFilled.displayName = 'ControlFilled'
