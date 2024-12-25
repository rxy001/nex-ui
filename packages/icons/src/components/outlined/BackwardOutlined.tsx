import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Backward from '../../svg/outlined/backward.svg'
import type { IconProps } from '../../types'

export const BackwardOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Backward, { className: 'backward-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
