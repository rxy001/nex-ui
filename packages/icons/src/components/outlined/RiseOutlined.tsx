import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rise from '../../svg/outlined/rise.svg'
import type { IconProps } from '../../types'

export const RiseOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Rise, { className: 'rise-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RiseOutlined.displayName = 'RiseOutlined'
