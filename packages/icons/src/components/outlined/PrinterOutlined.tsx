import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Printer from '../../svg/outlined/printer.svg'
import type { IconProps } from '../../types'

export const PrinterOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Printer)
    return <Icon {...props} ref={ref} />
  },
)
