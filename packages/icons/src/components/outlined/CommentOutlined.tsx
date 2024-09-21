import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Comment from '../../svg/outlined/comment.svg'
import type { IconProps } from '../../types'

export const CommentOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Comment)
    return <Icon {...props} ref={ref} />
  },
)
