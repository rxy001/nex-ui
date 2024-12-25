import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Select from '../../svg/outlined/select.svg'
import type { IconProps } from '../../types'

export const SelectOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Select, { className: 'select-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
