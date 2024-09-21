import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Inbox from '../../svg/outlined/inbox.svg'
import type { IconProps } from '../../types'

export const InboxOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Inbox)
    return <Icon {...props} ref={ref} />
  },
)
