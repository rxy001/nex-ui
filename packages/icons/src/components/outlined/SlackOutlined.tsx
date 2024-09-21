import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Slack from '../../svg/outlined/slack.svg'
import type { IconProps } from '../../types'

export const SlackOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Slack)
    return <Icon {...props} ref={ref} />
  },
)
