import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SafetyCertificate from '../../svg/filled/safety-certificate.svg'
import type { IconProps } from '../../types'

export const SafetyCertificateFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(SafetyCertificate, {
          className: 'safety-certificate-filled',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SafetyCertificateFilled.displayName = 'SafetyCertificateFilled'
