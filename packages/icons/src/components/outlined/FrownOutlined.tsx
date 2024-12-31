import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Frown from '../../svg/outlined/frown.svg'
import type { IconProps } from '../../types'

export const FrownOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Frown, { className: 'frown-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FrownOutlined.displayName = 'FrownOutlined'
