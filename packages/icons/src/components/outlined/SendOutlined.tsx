import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Send from '../../svg/outlined/send.svg'
import type { IconProps } from '../../types'

export const SendOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Send)
  return <Icon {...props} ref={ref} />
})
