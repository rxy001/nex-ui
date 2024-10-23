import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import EyeInvisible from '../../svg/outlined/eye-invisible.svg'
import type { IconProps } from '../../types'

export const EyeInvisibleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(EyeInvisible, {
      className: 'eye-invisible-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
