import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Signature from '../../svg/filled/signature.svg'
import type { IconProps } from '../../types'

export const SignatureFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Signature, { className: 'signature-filled' })
    return <Icon {...props} ref={ref} />
  },
)
