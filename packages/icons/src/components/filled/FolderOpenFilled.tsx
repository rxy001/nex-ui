'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FolderOpen from '../../svg/filled/folder-open.svg'
import type { IconProps } from '../../types'

export const FolderOpenFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FolderOpen, { className: 'folder-open-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FolderOpenFilled.displayName = 'FolderOpenFilled'
