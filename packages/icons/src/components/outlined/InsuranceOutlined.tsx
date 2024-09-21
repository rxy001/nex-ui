import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Insurance from '../../svg/outlined/insurance.svg'
import type { IconProps } from '../../types'

export const InsuranceOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Insurance)
    return <Icon {...props} ref={ref} />
  },
)
