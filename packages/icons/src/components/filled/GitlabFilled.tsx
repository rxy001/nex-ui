import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gitlab from '../../svg/filled/gitlab.svg'
import type { IconProps } from '../../types'

export const GitlabFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Gitlab, { className: 'gitlab-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
