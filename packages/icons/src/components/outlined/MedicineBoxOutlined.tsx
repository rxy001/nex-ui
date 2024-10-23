import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MedicineBox from '../../svg/outlined/medicine-box.svg'
import type { IconProps } from '../../types'

export const MedicineBoxOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MedicineBox, { className: 'medicine-box-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
