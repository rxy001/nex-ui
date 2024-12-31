import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Inbox from '../../svg/outlined/inbox.svg'
import type { IconProps } from '../../types'

export const InboxOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Inbox, { className: 'inbox-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InboxOutlined.displayName = 'InboxOutlined'
