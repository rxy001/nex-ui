import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bulb from '../../svg/outlined/bulb.svg'
import type { IconProps } from '../../types'

export const BulbOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Bulb, { className: 'bulb-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
