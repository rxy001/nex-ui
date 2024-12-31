import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Github from '../../svg/outlined/github.svg'
import type { IconProps } from '../../types'

export const GithubOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Github, { className: 'github-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GithubOutlined.displayName = 'GithubOutlined'
