import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ShareAlt from '../../svg/outlined/share-alt.svg'
import type { IconProps } from '../../types'

export const ShareAltOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ShareAlt, { className: 'share-alt-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ShareAltOutlined.displayName = 'ShareAltOutlined'
