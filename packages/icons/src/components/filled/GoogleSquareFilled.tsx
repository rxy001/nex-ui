import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import GoogleSquare from '../../svg/filled/google-square.svg'
import type { IconProps } from '../../types'

export const GoogleSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(GoogleSquare, { className: 'google-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
