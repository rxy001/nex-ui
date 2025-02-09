'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Snippets from '../../svg/filled/snippets.svg'
import type { IconProps } from '../../types'

export const SnippetsFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Snippets, { className: 'snippets-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SnippetsFilled.displayName = 'SnippetsFilled'
