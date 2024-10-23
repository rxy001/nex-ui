import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Switcher from '../../svg/outlined/switcher.svg'
import type { IconProps } from '../../types'

export const SwitcherOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Switcher, { className: 'switcher-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
