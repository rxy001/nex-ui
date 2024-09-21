import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Shrink from '../../svg/outlined/shrink.svg'
import type { IconProps } from '../../types'

export const ShrinkOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Shrink)
    return <Icon {...props} ref={ref} />
  },
)
