import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FontColors from '../../svg/outlined/font-colors.svg'
import type { IconProps } from '../../types'

export const FontColorsOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FontColors, { className: 'font-colors-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
