import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MedicineBox from '../../svg/filled/medicine-box.svg'
import type { IconProps } from '../../types'

export const MedicineBoxFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MedicineBox, { className: 'medicine-box-filled' })
    return <Icon {...props} ref={ref} />
  },
)
