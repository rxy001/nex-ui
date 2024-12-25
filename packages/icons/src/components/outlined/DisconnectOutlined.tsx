import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Disconnect from '../../svg/outlined/disconnect.svg'
import type { IconProps } from '../../types'

export const DisconnectOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Disconnect, { className: 'disconnect-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
