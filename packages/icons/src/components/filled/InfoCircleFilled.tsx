import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import InfoCircle from '../../svg/filled/info-circle.svg'
import type { IconProps } from '../../types'

export const InfoCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(InfoCircle, { className: 'info-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InfoCircleFilled.displayName = 'InfoCircleFilled'
