import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Underline from '../../svg/outlined/underline.svg'
import type { IconProps } from '../../types'

export const UnderlineOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Underline)
    return <Icon {...props} ref={ref} />
  },
)
