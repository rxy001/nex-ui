import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DoubleRight from '../../svg/outlined/double-right.svg'
import type { IconProps } from '../../types'

export const DoubleRightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DoubleRight, { className: 'double-right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DoubleRightOutlined.displayName = 'DoubleRightOutlined'
