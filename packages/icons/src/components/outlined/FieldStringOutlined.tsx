import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FieldString from '../../svg/outlined/field-string.svg'
import type { IconProps } from '../../types'

export const FieldStringOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FieldString)
    return <Icon {...props} ref={ref} />
  },
)
