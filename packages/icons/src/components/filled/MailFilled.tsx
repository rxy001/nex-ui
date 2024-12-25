import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Mail from '../../svg/filled/mail.svg'
import type { IconProps } from '../../types'

export const MailFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Mail, { className: 'mail-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
