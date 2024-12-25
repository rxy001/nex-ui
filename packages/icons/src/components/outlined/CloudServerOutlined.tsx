import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CloudServer from '../../svg/outlined/cloud-server.svg'
import type { IconProps } from '../../types'

export const CloudServerOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CloudServer, { className: 'cloud-server-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
