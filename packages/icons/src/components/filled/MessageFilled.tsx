import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Message from '../../svg/filled/message.svg'
import type { IconProps } from '../../types'

export const MessageFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Message)
    return <Icon {...props} ref={ref} />
  },
)
