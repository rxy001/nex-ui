import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RedEnvelope from '../../svg/filled/red-envelope.svg'
import type { IconProps } from '../../types'

export const RedEnvelopeFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RedEnvelope, { className: 'red-envelope-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
