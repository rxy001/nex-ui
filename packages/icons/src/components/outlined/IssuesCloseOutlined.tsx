import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import IssuesClose from '../../svg/outlined/issues-close.svg'
import type { IconProps } from '../../types'

export const IssuesCloseOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(IssuesClose)
    return <Icon {...props} ref={ref} />
  },
)
