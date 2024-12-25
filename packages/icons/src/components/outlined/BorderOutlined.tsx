import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Border from '../../svg/outlined/border.svg'
import type { IconProps } from '../../types'

export const BorderOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Border, { className: 'border-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
