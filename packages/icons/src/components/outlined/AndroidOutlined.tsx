import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Android from '../../svg/outlined/android.svg'
import type { IconProps } from '../../types'

export const AndroidOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Android, { className: 'android-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
