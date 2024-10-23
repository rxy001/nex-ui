import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Google from '../../svg/outlined/google.svg'
import type { IconProps } from '../../types'

export const GoogleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Google, { className: 'google-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
