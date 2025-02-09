'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Printer from '../../svg/outlined/printer.svg'
import type { IconProps } from '../../types'

export const PrinterOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Printer, { className: 'printer-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PrinterOutlined.displayName = 'PrinterOutlined'
