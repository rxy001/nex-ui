import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FontColors from '../../svg/outlined/font-colors.svg'
import type { IconProps } from '../../types'

export const FontColorsOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FontColors)
    return <Icon {...props} ref={ref} />
  },
)
