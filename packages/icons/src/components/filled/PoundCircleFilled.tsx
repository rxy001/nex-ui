import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PoundCircle from '../../svg/filled/pound-circle.svg'
import type { IconProps } from '../../types'

export const PoundCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PoundCircle, { className: 'pound-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
