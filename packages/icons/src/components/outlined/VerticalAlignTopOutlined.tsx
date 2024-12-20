import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalAlignTop from '../../svg/outlined/vertical-align-top.svg'
import type { IconProps } from '../../types'

export const VerticalAlignTopOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(VerticalAlignTop, {
      className: 'vertical-align-top-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
