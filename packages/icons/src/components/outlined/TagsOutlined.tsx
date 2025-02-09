'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tags from '../../svg/outlined/tags.svg'
import type { IconProps } from '../../types'

export const TagsOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Tags, { className: 'tags-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TagsOutlined.displayName = 'TagsOutlined'
