import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import DeliveredProcedure from '../../svg/outlined/delivered-procedure.svg'
import type { IconProps } from '../../types'

export const DeliveredProcedureOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(DeliveredProcedure, {
      className: 'delivered-procedure-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
