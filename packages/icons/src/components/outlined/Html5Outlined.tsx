import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Html5 from '../../svg/outlined/html5.svg'
import type { IconProps } from '../../types'

export const Html5Outlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Html5)
    return <Icon {...props} ref={ref} />
  },
)
