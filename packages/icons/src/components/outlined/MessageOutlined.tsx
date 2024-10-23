import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Message from '../../svg/outlined/message.svg'
import type { IconProps } from '../../types'

export const MessageOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Message, { className: 'message-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
