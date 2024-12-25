import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import EuroCircle from '../../svg/outlined/euro-circle.svg'
import type { IconProps } from '../../types'

export const EuroCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(EuroCircle, { className: 'euro-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
