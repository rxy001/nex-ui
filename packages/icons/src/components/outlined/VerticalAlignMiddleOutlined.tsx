import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalAlignMiddle from '../../svg/outlined/vertical-align-middle.svg'
import type { IconProps } from '../../types'

export const VerticalAlignMiddleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(VerticalAlignMiddle, {
      className: 'vertical-align-middle-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
