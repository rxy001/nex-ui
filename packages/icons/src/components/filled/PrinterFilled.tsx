import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Printer from '../../svg/filled/printer.svg'
import type { IconProps } from '../../types'

export const PrinterFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Printer, { className: 'printer-filled' })
    return <Icon {...props} ref={ref} />
  },
)
