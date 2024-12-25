import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderTop from '../../svg/outlined/border-top.svg'
import type { IconProps } from '../../types'

export const BorderTopOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BorderTop, { className: 'border-top-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
