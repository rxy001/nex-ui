import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderBottom from '../../svg/outlined/border-bottom.svg'
import type { IconProps } from '../../types'

export const BorderBottomOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BorderBottom, {
      className: 'border-bottom-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
