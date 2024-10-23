import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SafetyCertificate from '../../svg/filled/safety-certificate.svg'
import type { IconProps } from '../../types'

export const SafetyCertificateFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SafetyCertificate, {
      className: 'safety-certificate-filled',
    })
    return <Icon {...props} ref={ref} />
  },
)
