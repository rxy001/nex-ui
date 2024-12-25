import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Aim from '../../svg/outlined/aim.svg'
import type { IconProps } from '../../types'

export const AimOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Aim, { className: 'aim-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
