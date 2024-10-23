import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PullRequest from '../../svg/outlined/pull-request.svg'
import type { IconProps } from '../../types'

export const PullRequestOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PullRequest, { className: 'pull-request-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
