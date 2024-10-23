import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import WhatsApp from '../../svg/outlined/whats-app.svg'
import type { IconProps } from '../../types'

export const WhatsAppOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(WhatsApp, { className: 'whats-app-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
