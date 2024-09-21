import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import EyeInvisible from '../../svg/filled/eye-invisible.svg'
import type { IconProps } from '../../types'

export const EyeInvisibleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(EyeInvisible)
    return <Icon {...props} ref={ref} />
  },
)
