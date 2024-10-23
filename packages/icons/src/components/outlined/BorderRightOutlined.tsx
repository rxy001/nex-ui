import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderRight from '../../svg/outlined/border-right.svg'
import type { IconProps } from '../../types'

export const BorderRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BorderRight, { className: 'border-right-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
