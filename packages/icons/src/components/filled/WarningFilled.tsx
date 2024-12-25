import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Warning from '../../svg/filled/warning.svg'
import type { IconProps } from '../../types'

export const WarningFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Warning, { className: 'warning-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
