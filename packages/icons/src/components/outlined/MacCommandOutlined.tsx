import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MacCommand from '../../svg/outlined/mac-command.svg'
import type { IconProps } from '../../types'

export const MacCommandOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MacCommand, { className: 'mac-command-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
