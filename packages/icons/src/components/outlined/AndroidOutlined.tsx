import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Android from '../../svg/outlined/android.svg'
import type { IconProps } from '../../types'

export const AndroidOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Android, { className: 'android-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
