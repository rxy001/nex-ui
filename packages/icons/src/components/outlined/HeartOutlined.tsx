import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Heart from '../../svg/outlined/heart.svg'
import type { IconProps } from '../../types'

export const HeartOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Heart, { className: 'heart-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
