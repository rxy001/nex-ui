'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Barcode from '../../svg/outlined/barcode.svg'
import type { IconProps } from '../../types'

export const BarcodeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Barcode, { className: 'barcode-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BarcodeOutlined.displayName = 'BarcodeOutlined'
