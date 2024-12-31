import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Warning from '../../svg/outlined/warning.svg'
import type { IconProps } from '../../types'

export const WarningOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Warning, { className: 'warning-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WarningOutlined.displayName = 'WarningOutlined'
