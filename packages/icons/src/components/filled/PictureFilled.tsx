import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Picture from '../../svg/filled/picture.svg'
import type { IconProps } from '../../types'

export const PictureFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Picture, { className: 'picture-filled' })
    return <Icon {...props} ref={ref} />
  },
)
