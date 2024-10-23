import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderOuter from '../../svg/outlined/border-outer.svg'
import type { IconProps } from '../../types'

export const BorderOuterOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BorderOuter, { className: 'border-outer-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
