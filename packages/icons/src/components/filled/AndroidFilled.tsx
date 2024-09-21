import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Android from '../../svg/filled/android.svg'
import type { IconProps } from '../../types'

export const AndroidFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Android)
    return <Icon {...props} ref={ref} />
  },
)
