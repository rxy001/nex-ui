import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gitlab from '../../svg/outlined/gitlab.svg'
import type { IconProps } from '../../types'

export const GitlabOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Gitlab, { className: 'gitlab-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
