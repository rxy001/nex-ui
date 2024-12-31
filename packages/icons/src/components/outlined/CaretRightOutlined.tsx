import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretRight from '../../svg/outlined/caret-right.svg'
import type { IconProps } from '../../types'

export const CaretRightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CaretRight, { className: 'caret-right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CaretRightOutlined.displayName = 'CaretRightOutlined'
