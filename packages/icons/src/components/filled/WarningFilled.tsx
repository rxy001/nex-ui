import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Warning from '../../svg/filled/warning.svg'
import type { IconProps } from '../../types'

export const WarningFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Warning)
    return <Icon {...props} ref={ref} />
  },
)
