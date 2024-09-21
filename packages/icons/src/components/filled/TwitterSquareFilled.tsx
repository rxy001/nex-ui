import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import TwitterSquare from '../../svg/filled/twitter-square.svg'
import type { IconProps } from '../../types'

export const TwitterSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(TwitterSquare)
    return <Icon {...props} ref={ref} />
  },
)
