'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Usb from '../../svg/filled/usb.svg'
import type { IconProps } from '../../types'

export const UsbFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Usb, { className: 'usb-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

UsbFilled.displayName = 'UsbFilled'
