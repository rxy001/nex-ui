import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MediumWorkmark from '../../svg/outlined/medium-workmark.svg'
import type { IconProps } from '../../types'

export const MediumWorkmarkOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(MediumWorkmark, { className: 'medium-workmark-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
