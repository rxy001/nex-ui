import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import IssuesClose from '../../svg/outlined/issues-close.svg'
import type { IconProps } from '../../types'

export const IssuesCloseOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(IssuesClose, { className: 'issues-close-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

IssuesCloseOutlined.displayName = 'IssuesCloseOutlined'
