import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Comment from '../../svg/outlined/comment.svg'
import type { IconProps } from '../../types'

export const CommentOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Comment, { className: 'comment-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
