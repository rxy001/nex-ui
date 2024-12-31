import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Control from '../../svg/outlined/control.svg'
import type { IconProps } from '../../types'

export const ControlOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Control, { className: 'control-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ControlOutlined.displayName = 'ControlOutlined'
