import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RedEnvelope from '../../svg/filled/red-envelope.svg'
import type { IconProps } from '../../types'

export const RedEnvelopeFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RedEnvelope, { className: 'red-envelope-filled' })
    return <Icon {...props} ref={ref} />
  },
)
