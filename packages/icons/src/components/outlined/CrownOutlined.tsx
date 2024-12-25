import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Crown from '../../svg/outlined/crown.svg'
import type { IconProps } from '../../types'

export const CrownOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Crown, { className: 'crown-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
