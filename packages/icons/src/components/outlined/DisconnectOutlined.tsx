import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Disconnect from '../../svg/outlined/disconnect.svg'
import type { IconProps } from '../../types'

export const DisconnectOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Disconnect)
    return <Icon {...props} ref={ref} />
  },
)
