import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Alert from '../../svg/filled/alert.svg'
import type { IconProps } from '../../types'

export const AlertFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Alert, { className: 'alert-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AlertFilled.displayName = 'AlertFilled'
