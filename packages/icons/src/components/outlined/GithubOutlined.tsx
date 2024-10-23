import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Github from '../../svg/outlined/github.svg'
import type { IconProps } from '../../types'

export const GithubOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Github, { className: 'github-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
