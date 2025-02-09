'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FolderOpen from '../../svg/outlined/folder-open.svg'
import type { IconProps } from '../../types'

export const FolderOpenOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FolderOpen, { className: 'folder-open-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FolderOpenOutlined.displayName = 'FolderOpenOutlined'
