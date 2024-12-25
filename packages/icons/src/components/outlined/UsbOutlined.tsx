import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Usb from '../../svg/outlined/usb.svg'
import type { IconProps } from '../../types'

export const UsbOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Usb, { className: 'usb-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
