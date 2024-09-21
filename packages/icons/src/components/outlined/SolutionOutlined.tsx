import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Solution from '../../svg/outlined/solution.svg'
import type { IconProps } from '../../types'

export const SolutionOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Solution)
    return <Icon {...props} ref={ref} />
  },
)
