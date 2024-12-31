import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretLeft from '../../svg/outlined/caret-left.svg'
import type { IconProps } from '../../types'

export const CaretLeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CaretLeft, { className: 'caret-left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CaretLeftOutlined.displayName = 'CaretLeftOutlined'
