import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Qrcode from '../../svg/outlined/qrcode.svg'
import type { IconProps } from '../../types'

export const QrcodeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Qrcode, { className: 'qrcode-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
