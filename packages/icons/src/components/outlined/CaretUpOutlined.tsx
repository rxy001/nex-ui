import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CaretUp from '../../svg/outlined/caret-up.svg'
import type { IconProps } from '../../types'

export const CaretUpOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CaretUp, { className: 'caret-up-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CaretUpOutlined.displayName = 'CaretUpOutlined'
