import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Insurance from '../../svg/filled/insurance.svg'
import type { IconProps } from '../../types'

export const InsuranceFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Insurance, { className: 'insurance-filled' })
    return <Icon {...props} ref={ref} />
  },
)
