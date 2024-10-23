import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Facebook from '../../svg/filled/facebook.svg'
import type { IconProps } from '../../types'

export const FacebookFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Facebook, { className: 'facebook-filled' })
    return <Icon {...props} ref={ref} />
  },
)
