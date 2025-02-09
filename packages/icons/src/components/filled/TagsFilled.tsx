'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tags from '../../svg/filled/tags.svg'
import type { IconProps } from '../../types'

export const TagsFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Tags, { className: 'tags-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

TagsFilled.displayName = 'TagsFilled'
