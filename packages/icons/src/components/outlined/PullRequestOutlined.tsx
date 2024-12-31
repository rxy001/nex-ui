import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PullRequest from '../../svg/outlined/pull-request.svg'
import type { IconProps } from '../../types'

export const PullRequestOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PullRequest, { className: 'pull-request-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PullRequestOutlined.displayName = 'PullRequestOutlined'
