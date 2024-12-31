import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Forward from '../../svg/outlined/forward.svg'
import type { IconProps } from '../../types'

export const ForwardOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Forward, { className: 'forward-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ForwardOutlined.displayName = 'ForwardOutlined'
