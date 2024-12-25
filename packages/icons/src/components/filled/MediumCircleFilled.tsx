import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MediumCircle from '../../svg/filled/medium-circle.svg'
import type { IconProps } from '../../types'

export const MediumCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MediumCircle, { className: 'medium-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
