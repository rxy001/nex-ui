import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Switcher from '../../svg/filled/switcher.svg'
import type { IconProps } from '../../types'

export const SwitcherFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Switcher, { className: 'switcher-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
