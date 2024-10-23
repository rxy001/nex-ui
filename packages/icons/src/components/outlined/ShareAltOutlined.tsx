import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ShareAlt from '../../svg/outlined/share-alt.svg'
import type { IconProps } from '../../types'

export const ShareAltOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ShareAlt, { className: 'share-alt-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
