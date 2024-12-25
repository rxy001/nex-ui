import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Man from '../../svg/outlined/man.svg'
import type { IconProps } from '../../types'

export const ManOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Man, { className: 'man-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
