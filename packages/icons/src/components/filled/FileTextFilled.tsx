'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileText from '../../svg/filled/file-text.svg'
import type { IconProps } from '../../types'

export const FileTextFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileText, { className: 'file-text-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileTextFilled.displayName = 'FileTextFilled'
