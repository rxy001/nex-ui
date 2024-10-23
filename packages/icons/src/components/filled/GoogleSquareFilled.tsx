import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import GoogleSquare from '../../svg/filled/google-square.svg'
import type { IconProps } from '../../types'

export const GoogleSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(GoogleSquare, { className: 'google-square-filled' })
    return <Icon {...props} ref={ref} />
  },
)
