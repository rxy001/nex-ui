import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CarryOut from '../../svg/outlined/carry-out.svg'
import type { IconProps } from '../../types'

export const CarryOutOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CarryOut, { className: 'carry-out-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CarryOutOutlined.displayName = 'CarryOutOutlined'
