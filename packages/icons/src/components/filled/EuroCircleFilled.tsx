import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import EuroCircle from '../../svg/filled/euro-circle.svg'
import type { IconProps } from '../../types'

export const EuroCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(EuroCircle, { className: 'euro-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
