import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SafetyCertificate from '../../svg/outlined/safety-certificate.svg'
import type { IconProps } from '../../types'

export const SafetyCertificateOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SafetyCertificate, {
      className: 'safety-certificate-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
