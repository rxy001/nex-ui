import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Apple from '../../svg/outlined/apple.svg'
import type { IconProps } from '../../types'

export const AppleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Apple, { className: 'apple-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
