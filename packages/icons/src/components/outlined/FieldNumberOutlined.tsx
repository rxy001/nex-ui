import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FieldNumber from '../../svg/outlined/field-number.svg'
import type { IconProps } from '../../types'

export const FieldNumberOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FieldNumber)
    return <Icon {...props} ref={ref} />
  },
)
