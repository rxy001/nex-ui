import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Instagram from '../../svg/filled/instagram.svg'
import type { IconProps } from '../../types'

export const InstagramFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Instagram, { className: 'instagram-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
