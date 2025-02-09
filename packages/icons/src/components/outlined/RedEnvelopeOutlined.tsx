'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RedEnvelope from '../../svg/outlined/red-envelope.svg'
import type { IconProps } from '../../types'

export const RedEnvelopeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RedEnvelope, { className: 'red-envelope-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RedEnvelopeOutlined.displayName = 'RedEnvelopeOutlined'
