import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pinterest from '../../svg/filled/pinterest.svg'
import type { IconProps } from '../../types'

export const PinterestFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Pinterest, { className: 'pinterest-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
