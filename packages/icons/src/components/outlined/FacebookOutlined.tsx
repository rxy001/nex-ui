import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Facebook from '../../svg/outlined/facebook.svg'
import type { IconProps } from '../../types'

export const FacebookOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Facebook, { className: 'facebook-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
