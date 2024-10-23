import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BgColors from '../../svg/outlined/bg-colors.svg'
import type { IconProps } from '../../types'

export const BgColorsOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BgColors, { className: 'bg-colors-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
