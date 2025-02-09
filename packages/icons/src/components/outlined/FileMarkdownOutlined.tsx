'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileMarkdown from '../../svg/outlined/file-markdown.svg'
import type { IconProps } from '../../types'

export const FileMarkdownOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileMarkdown, { className: 'file-markdown-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileMarkdownOutlined.displayName = 'FileMarkdownOutlined'
