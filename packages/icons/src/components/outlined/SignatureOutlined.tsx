'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Signature from '../../svg/outlined/signature.svg'
import type { IconProps } from '../../types'

export const SignatureOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Signature, { className: 'signature-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SignatureOutlined.displayName = 'SignatureOutlined'
