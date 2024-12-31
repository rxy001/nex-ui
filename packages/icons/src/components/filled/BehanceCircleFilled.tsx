import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BehanceCircle from '../../svg/filled/behance-circle.svg'
import type { IconProps } from '../../types'

export const BehanceCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BehanceCircle, { className: 'behance-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BehanceCircleFilled.displayName = 'BehanceCircleFilled'
