import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Retweet from '../../svg/outlined/retweet.svg'
import type { IconProps } from '../../types'

export const RetweetOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Retweet)
    return <Icon {...props} ref={ref} />
  },
)
