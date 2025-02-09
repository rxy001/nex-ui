'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Like from '../../svg/filled/like.svg'
import type { IconProps } from '../../types'

export const LikeFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Like, { className: 'like-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

LikeFilled.displayName = 'LikeFilled'
