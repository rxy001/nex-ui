import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Google from '../../svg/outlined/google.svg'
import type { IconProps } from '../../types'

export const GoogleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Google, { className: 'google-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
