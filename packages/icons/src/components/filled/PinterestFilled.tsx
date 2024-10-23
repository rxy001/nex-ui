import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pinterest from '../../svg/filled/pinterest.svg'
import type { IconProps } from '../../types'

export const PinterestFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Pinterest, { className: 'pinterest-filled' })
    return <Icon {...props} ref={ref} />
  },
)
