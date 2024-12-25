import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FieldString from '../../svg/outlined/field-string.svg'
import type { IconProps } from '../../types'

export const FieldStringOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FieldString, { className: 'field-string-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
