import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Picture from '../../svg/outlined/picture.svg'
import type { IconProps } from '../../types'

export const PictureOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Picture)
    return <Icon {...props} ref={ref} />
  },
)
