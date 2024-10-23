import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SlackCircle from '../../svg/filled/slack-circle.svg'
import type { IconProps } from '../../types'

export const SlackCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SlackCircle, { className: 'slack-circle-filled' })
    return <Icon {...props} ref={ref} />
  },
)
