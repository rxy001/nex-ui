import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Insurance from '../../svg/outlined/insurance.svg'
import type { IconProps } from '../../types'

export const InsuranceOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Insurance, { className: 'insurance-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
