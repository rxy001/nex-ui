import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Plus from '../../svg/outlined/plus.svg'
import type { IconProps } from '../../types'

export const PlusOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Plus, { className: 'plus-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PlusOutlined.displayName = 'PlusOutlined'
