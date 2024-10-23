import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Crown from '../../svg/outlined/crown.svg'
import type { IconProps } from '../../types'

export const CrownOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Crown, { className: 'crown-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
