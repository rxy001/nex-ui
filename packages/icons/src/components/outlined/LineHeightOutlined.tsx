import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import LineHeight from '../../svg/outlined/line-height.svg'
import type { IconProps } from '../../types'

export const LineHeightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(LineHeight, { className: 'line-height-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LineHeightOutlined.displayName = 'LineHeightOutlined'
