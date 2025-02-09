'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Printer from '../../svg/filled/printer.svg'
import type { IconProps } from '../../types'

export const PrinterFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Printer, { className: 'printer-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PrinterFilled.displayName = 'PrinterFilled'
