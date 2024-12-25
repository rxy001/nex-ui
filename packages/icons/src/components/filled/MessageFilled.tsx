import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Message from '../../svg/filled/message.svg'
import type { IconProps } from '../../types'

export const MessageFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Message, { className: 'message-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
