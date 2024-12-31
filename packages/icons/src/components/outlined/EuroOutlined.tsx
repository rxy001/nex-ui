import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Euro from '../../svg/outlined/euro.svg'
import type { IconProps } from '../../types'

export const EuroOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Euro, { className: 'euro-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

EuroOutlined.displayName = 'EuroOutlined'
