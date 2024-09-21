import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Mail from '../../svg/outlined/mail.svg'
import type { IconProps } from '../../types'

export const MailOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Mail)
  return <Icon {...props} ref={ref} />
})
