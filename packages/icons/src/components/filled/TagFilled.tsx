'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tag from '../../svg/filled/tag.svg'
import type { IconProps } from '../../types'

export const TagFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Tag, { className: 'tag-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

TagFilled.displayName = 'TagFilled'
