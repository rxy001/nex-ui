import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Instagram from '../../svg/filled/instagram.svg'
import type { IconProps } from '../../types'

export const InstagramFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Instagram)
    return <Icon {...props} ref={ref} />
  },
)
