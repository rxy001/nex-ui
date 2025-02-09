'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Translation from '../../svg/outlined/translation.svg'
import type { IconProps } from '../../types'

export const TranslationOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Translation, { className: 'translation-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TranslationOutlined.displayName = 'TranslationOutlined'
