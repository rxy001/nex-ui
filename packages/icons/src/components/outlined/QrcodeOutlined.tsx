import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Qrcode from '../../svg/outlined/qrcode.svg'
import type { IconProps } from '../../types'

export const QrcodeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Qrcode)
    return <Icon {...props} ref={ref} />
  },
)
