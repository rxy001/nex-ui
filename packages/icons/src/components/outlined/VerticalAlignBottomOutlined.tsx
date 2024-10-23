import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalAlignBottom from '../../svg/outlined/vertical-align-bottom.svg'
import type { IconProps } from '../../types'

export const VerticalAlignBottomOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(VerticalAlignBottom, {
      className: 'vertical-align-bottom-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
