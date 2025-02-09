'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import OpenAI from '../../svg/outlined/open-a-i.svg'
import type { IconProps } from '../../types'

export const OpenAIOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(OpenAI, { className: 'open-a-i-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

OpenAIOutlined.displayName = 'OpenAIOutlined'
