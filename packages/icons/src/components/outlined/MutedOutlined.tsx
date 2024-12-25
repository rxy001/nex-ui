import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Muted from '../../svg/outlined/muted.svg'
import type { IconProps } from '../../types'

export const MutedOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Muted, { className: 'muted-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
