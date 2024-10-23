import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MacCommand from '../../svg/outlined/mac-command.svg'
import type { IconProps } from '../../types'

export const MacCommandOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MacCommand, { className: 'mac-command-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
