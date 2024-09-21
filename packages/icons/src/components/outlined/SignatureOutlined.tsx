import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Signature from '../../svg/outlined/signature.svg'
import type { IconProps } from '../../types'

export const SignatureOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Signature)
    return <Icon {...props} ref={ref} />
  },
)
