import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import GooglePlusCircle from '../../svg/filled/google-plus-circle.svg'
import type { IconProps } from '../../types'

export const GooglePlusCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(GooglePlusCircle, {
      className: 'google-plus-circle-filled',
    })
    return <Icon {...props} ref={ref} />
  },
)
