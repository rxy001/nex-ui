'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MedicineBox from '../../svg/filled/medicine-box.svg'
import type { IconProps } from '../../types'

export const MedicineBoxFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MedicineBox, { className: 'medicine-box-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MedicineBoxFilled.displayName = 'MedicineBoxFilled'
