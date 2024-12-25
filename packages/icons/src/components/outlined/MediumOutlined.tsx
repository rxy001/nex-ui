import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Medium from '../../svg/outlined/medium.svg'
import type { IconProps } from '../../types'

export const MediumOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Medium, { className: 'medium-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
