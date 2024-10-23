import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Poweroff from '../../svg/outlined/poweroff.svg'
import type { IconProps } from '../../types'

export const PoweroffOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Poweroff, { className: 'poweroff-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
