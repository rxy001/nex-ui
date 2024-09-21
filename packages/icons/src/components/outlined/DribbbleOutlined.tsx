import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dribbble from '../../svg/outlined/dribbble.svg'
import type { IconProps } from '../../types'

export const DribbbleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Dribbble)
    return <Icon {...props} ref={ref} />
  },
)
