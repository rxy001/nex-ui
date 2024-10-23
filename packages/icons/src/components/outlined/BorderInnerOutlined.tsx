import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderInner from '../../svg/outlined/border-inner.svg'
import type { IconProps } from '../../types'

export const BorderInnerOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BorderInner, { className: 'border-inner-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
