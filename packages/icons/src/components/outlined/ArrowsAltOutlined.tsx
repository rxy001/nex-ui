import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ArrowsAlt from '../../svg/outlined/arrows-alt.svg'
import type { IconProps } from '../../types'

export const ArrowsAltOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ArrowsAlt, { className: 'arrows-alt-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
