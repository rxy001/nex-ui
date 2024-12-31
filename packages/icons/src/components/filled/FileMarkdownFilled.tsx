import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileMarkdown from '../../svg/filled/file-markdown.svg'
import type { IconProps } from '../../types'

export const FileMarkdownFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileMarkdown, { className: 'file-markdown-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileMarkdownFilled.displayName = 'FileMarkdownFilled'
