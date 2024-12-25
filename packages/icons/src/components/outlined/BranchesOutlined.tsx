import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Branches from '../../svg/outlined/branches.svg'
import type { IconProps } from '../../types'

export const BranchesOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Branches, { className: 'branches-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
