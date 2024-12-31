import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import GooglePlus from '../../svg/outlined/google-plus.svg'
import type { IconProps } from '../../types'

export const GooglePlusOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(GooglePlus, { className: 'google-plus-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GooglePlusOutlined.displayName = 'GooglePlusOutlined'
