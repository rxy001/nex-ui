import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FieldBinary from '../../svg/outlined/field-binary.svg'
import type { IconProps } from '../../types'

export const FieldBinaryOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FieldBinary, { className: 'field-binary-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
