import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Right from '../../svg/outlined/right.svg'
import type { IconProps } from '../../types'

export const RightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Right, { className: 'right-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
