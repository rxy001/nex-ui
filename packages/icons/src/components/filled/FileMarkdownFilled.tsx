import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileMarkdown from '../../svg/filled/file-markdown.svg'
import type { IconProps } from '../../types'

export const FileMarkdownFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileMarkdown, { className: 'file-markdown-filled' })
    return <Icon {...props} ref={ref} />
  },
)
