import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Frown from '../../svg/outlined/frown.svg'
import type { IconProps } from '../../types'

export const FrownOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Frown, { className: 'frown-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
