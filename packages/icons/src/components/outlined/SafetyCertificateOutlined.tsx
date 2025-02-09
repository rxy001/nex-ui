'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SafetyCertificate from '../../svg/outlined/safety-certificate.svg'
import type { IconProps } from '../../types'

export const SafetyCertificateOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(SafetyCertificate, {
          className: 'safety-certificate-outlined',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SafetyCertificateOutlined.displayName = 'SafetyCertificateOutlined'
