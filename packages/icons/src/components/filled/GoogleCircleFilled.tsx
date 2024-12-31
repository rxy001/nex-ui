import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import GoogleCircle from '../../svg/filled/google-circle.svg'
import type { IconProps } from '../../types'

export const GoogleCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(GoogleCircle, { className: 'google-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GoogleCircleFilled.displayName = 'GoogleCircleFilled'
