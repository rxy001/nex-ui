import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalRight from '../../svg/outlined/vertical-right.svg'
import type { IconProps } from '../../types'

export const VerticalRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(VerticalRight, {
      className: 'vertical-right-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
