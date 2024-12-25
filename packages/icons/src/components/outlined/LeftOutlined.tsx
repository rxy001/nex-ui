import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Left from '../../svg/outlined/left.svg'
import type { IconProps } from '../../types'

export const LeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Left, { className: 'left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
