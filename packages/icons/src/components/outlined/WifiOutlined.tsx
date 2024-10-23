import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Wifi from '../../svg/outlined/wifi.svg'
import type { IconProps } from '../../types'

export const WifiOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Wifi, { className: 'wifi-outlined' })
  return <Icon {...props} ref={ref} />
})
