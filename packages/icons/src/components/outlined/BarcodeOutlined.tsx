import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Barcode from '../../svg/outlined/barcode.svg'
import type { IconProps } from '../../types'

export const BarcodeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Barcode)
    return <Icon {...props} ref={ref} />
  },
)
