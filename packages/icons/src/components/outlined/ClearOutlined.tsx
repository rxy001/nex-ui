import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Clear from '../../svg/outlined/clear.svg'
import type { IconProps } from '../../types'

export const ClearOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Clear, { className: 'clear-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ClearOutlined.displayName = 'ClearOutlined'
