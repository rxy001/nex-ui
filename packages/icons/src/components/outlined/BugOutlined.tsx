import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bug from '../../svg/outlined/bug.svg'
import type { IconProps } from '../../types'

export const BugOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Bug, { className: 'bug-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BugOutlined.displayName = 'BugOutlined'
