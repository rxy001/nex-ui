import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Message from '../../svg/outlined/message.svg'
import type { IconProps } from '../../types'

export const MessageOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Message, { className: 'message-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
