import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Switcher from '../../svg/outlined/switcher.svg'
import type { IconProps } from '../../types'

export const SwitcherOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Switcher, { className: 'switcher-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
