import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FontSize from '../../svg/outlined/font-size.svg'
import type { IconProps } from '../../types'

export const FontSizeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FontSize)
    return <Icon {...props} ref={ref} />
  },
)
