import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RedEnvelope from '../../svg/outlined/red-envelope.svg'
import type { IconProps } from '../../types'

export const RedEnvelopeOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RedEnvelope)
    return <Icon {...props} ref={ref} />
  },
)
