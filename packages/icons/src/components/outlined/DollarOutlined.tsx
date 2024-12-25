import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dollar from '../../svg/outlined/dollar.svg'
import type { IconProps } from '../../types'

export const DollarOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Dollar, { className: 'dollar-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
