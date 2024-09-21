import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MacCommand from '../../svg/filled/mac-command.svg'
import type { IconProps } from '../../types'

export const MacCommandFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MacCommand)
    return <Icon {...props} ref={ref} />
  },
)
