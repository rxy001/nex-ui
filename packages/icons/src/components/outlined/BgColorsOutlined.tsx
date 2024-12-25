import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import BgColors from '../../svg/outlined/bg-colors.svg'
import type { IconProps } from '../../types'

export const BgColorsOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(BgColors, { className: 'bg-colors-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
