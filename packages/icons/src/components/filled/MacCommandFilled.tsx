import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MacCommand from '../../svg/filled/mac-command.svg'
import type { IconProps } from '../../types'

export const MacCommandFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MacCommand, { className: 'mac-command-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
