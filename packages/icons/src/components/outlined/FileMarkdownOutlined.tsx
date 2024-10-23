import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileMarkdown from '../../svg/outlined/file-markdown.svg'
import type { IconProps } from '../../types'

export const FileMarkdownOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileMarkdown, {
      className: 'file-markdown-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
