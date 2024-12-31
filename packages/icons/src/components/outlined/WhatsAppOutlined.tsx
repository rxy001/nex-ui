import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import WhatsApp from '../../svg/outlined/whats-app.svg'
import type { IconProps } from '../../types'

export const WhatsAppOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(WhatsApp, { className: 'whats-app-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

WhatsAppOutlined.displayName = 'WhatsAppOutlined'
