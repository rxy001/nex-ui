import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Apple from '../../svg/outlined/apple.svg'
import type { IconProps } from '../../types'

export const AppleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Apple, { className: 'apple-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

AppleOutlined.displayName = 'AppleOutlined'
