import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Copyright from '../../svg/outlined/copyright.svg'
import type { IconProps } from '../../types'

export const CopyrightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Copyright)
    return <Icon {...props} ref={ref} />
  },
)
