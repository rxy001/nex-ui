import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Close from '../../svg/outlined/close.svg'
import type { IconProps } from '../../types'

export const CloseOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Close, { className: 'close-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CloseOutlined.displayName = 'CloseOutlined'
