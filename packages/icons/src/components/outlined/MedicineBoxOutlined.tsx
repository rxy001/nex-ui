import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MedicineBox from '../../svg/outlined/medicine-box.svg'
import type { IconProps } from '../../types'

export const MedicineBoxOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MedicineBox, { className: 'medicine-box-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
