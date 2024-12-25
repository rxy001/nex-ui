import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RotateLeft from '../../svg/outlined/rotate-left.svg'
import type { IconProps } from '../../types'

export const RotateLeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RotateLeft, { className: 'rotate-left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
