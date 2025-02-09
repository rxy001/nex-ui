'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Mail from '../../svg/outlined/mail.svg'
import type { IconProps } from '../../types'

export const MailOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Mail, { className: 'mail-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MailOutlined.displayName = 'MailOutlined'
