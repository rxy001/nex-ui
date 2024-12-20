import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Mail from '../../svg/filled/mail.svg'
import type { IconProps } from '../../types'

export const MailFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Mail, { className: 'mail-filled' })
  return <Icon {...props} ref={ref} />
})
