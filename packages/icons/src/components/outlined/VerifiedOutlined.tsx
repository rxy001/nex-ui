import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Verified from '../../svg/outlined/verified.svg'
import type { IconProps } from '../../types'

export const VerifiedOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Verified, { className: 'verified-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

VerifiedOutlined.displayName = 'VerifiedOutlined'
