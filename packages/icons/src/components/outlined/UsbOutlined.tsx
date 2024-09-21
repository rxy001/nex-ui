import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Usb from '../../svg/outlined/usb.svg'
import type { IconProps } from '../../types'

export const UsbOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Usb)
  return <Icon {...props} ref={ref} />
})
