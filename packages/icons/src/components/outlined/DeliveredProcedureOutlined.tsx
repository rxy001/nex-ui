import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DeliveredProcedure from '../../svg/outlined/delivered-procedure.svg'
import type { IconProps } from '../../types'

export const DeliveredProcedureOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(DeliveredProcedure, {
          className: 'delivered-procedure-outlined',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
