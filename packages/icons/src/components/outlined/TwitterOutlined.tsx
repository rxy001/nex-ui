import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Twitter from '../../svg/outlined/twitter.svg'
import type { IconProps } from '../../types'

export const TwitterOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Twitter)
    return <Icon {...props} ref={ref} />
  },
)
