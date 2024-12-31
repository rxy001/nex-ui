import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FontSize from '../../svg/outlined/font-size.svg'
import type { IconProps } from '../../types'

export const FontSizeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FontSize, { className: 'font-size-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FontSizeOutlined.displayName = 'FontSizeOutlined'
