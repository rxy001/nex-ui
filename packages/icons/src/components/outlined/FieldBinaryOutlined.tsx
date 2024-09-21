import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FieldBinary from '../../svg/outlined/field-binary.svg'
import type { IconProps } from '../../types'

export const FieldBinaryOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FieldBinary)
    return <Icon {...props} ref={ref} />
  },
)
