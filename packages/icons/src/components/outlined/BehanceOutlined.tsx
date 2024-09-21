import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Behance from '../../svg/outlined/behance.svg'
import type { IconProps } from '../../types'

export const BehanceOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Behance)
    return <Icon {...props} ref={ref} />
  },
)
