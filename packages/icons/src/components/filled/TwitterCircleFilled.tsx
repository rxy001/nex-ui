import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import TwitterCircle from '../../svg/filled/twitter-circle.svg'
import type { IconProps } from '../../types'

export const TwitterCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(TwitterCircle)
    return <Icon {...props} ref={ref} />
  },
)
