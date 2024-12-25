import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Facebook from '../../svg/filled/facebook.svg'
import type { IconProps } from '../../types'

export const FacebookFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Facebook, { className: 'facebook-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
