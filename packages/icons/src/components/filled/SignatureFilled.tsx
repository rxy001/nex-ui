'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Signature from '../../svg/filled/signature.svg'
import type { IconProps } from '../../types'

export const SignatureFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Signature, { className: 'signature-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SignatureFilled.displayName = 'SignatureFilled'
