import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import GoogleCircle from '../../svg/filled/google-circle.svg'
import type { IconProps } from '../../types'

export const GoogleCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(GoogleCircle)
    return <Icon {...props} ref={ref} />
  },
)
