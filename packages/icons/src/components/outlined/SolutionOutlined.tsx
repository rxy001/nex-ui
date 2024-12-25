import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Solution from '../../svg/outlined/solution.svg'
import type { IconProps } from '../../types'

export const SolutionOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Solution, { className: 'solution-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
