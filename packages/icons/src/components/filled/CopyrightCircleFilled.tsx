import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import CopyrightCircle from '../../svg/filled/copyright-circle.svg'
import type { IconProps } from '../../types'

export const CopyrightCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(CopyrightCircle)
    return <Icon {...props} ref={ref} />
  },
)
