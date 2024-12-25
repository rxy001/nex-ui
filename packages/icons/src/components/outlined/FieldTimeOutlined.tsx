import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FieldTime from '../../svg/outlined/field-time.svg'
import type { IconProps } from '../../types'

export const FieldTimeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FieldTime, { className: 'field-time-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
