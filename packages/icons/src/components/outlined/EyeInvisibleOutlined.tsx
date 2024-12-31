import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import EyeInvisible from '../../svg/outlined/eye-invisible.svg'
import type { IconProps } from '../../types'

export const EyeInvisibleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(EyeInvisible, { className: 'eye-invisible-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

EyeInvisibleOutlined.displayName = 'EyeInvisibleOutlined'
