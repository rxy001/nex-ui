import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Branches from '../../svg/outlined/branches.svg'
import type { IconProps } from '../../types'

export const BranchesOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Branches, { className: 'branches-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
