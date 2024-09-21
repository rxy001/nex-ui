import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Switcher from '../../svg/filled/switcher.svg'
import type { IconProps } from '../../types'

export const SwitcherFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Switcher)
    return <Icon {...props} ref={ref} />
  },
)
