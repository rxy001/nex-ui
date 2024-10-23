import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import GooglePlus from '../../svg/outlined/google-plus.svg'
import type { IconProps } from '../../types'

export const GooglePlusOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(GooglePlus, { className: 'google-plus-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
