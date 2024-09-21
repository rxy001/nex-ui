import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FieldTime from '../../svg/outlined/field-time.svg'
import type { IconProps } from '../../types'

export const FieldTimeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FieldTime)
    return <Icon {...props} ref={ref} />
  },
)
