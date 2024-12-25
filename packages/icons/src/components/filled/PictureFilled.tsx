import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Picture from '../../svg/filled/picture.svg'
import type { IconProps } from '../../types'

export const PictureFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Picture, { className: 'picture-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
