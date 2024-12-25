import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Enter from '../../svg/outlined/enter.svg'
import type { IconProps } from '../../types'

export const EnterOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Enter, { className: 'enter-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
