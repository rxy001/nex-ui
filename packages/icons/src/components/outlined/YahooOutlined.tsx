import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Yahoo from '../../svg/outlined/yahoo.svg'
import type { IconProps } from '../../types'

export const YahooOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Yahoo)
    return <Icon {...props} ref={ref} />
  },
)
