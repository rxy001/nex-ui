import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Trophy from '../../svg/outlined/trophy.svg'
import type { IconProps } from '../../types'

export const TrophyOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Trophy, { className: 'trophy-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TrophyOutlined.displayName = 'TrophyOutlined'
