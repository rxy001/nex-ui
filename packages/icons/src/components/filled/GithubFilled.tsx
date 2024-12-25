import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Github from '../../svg/filled/github.svg'
import type { IconProps } from '../../types'

export const GithubFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Github, { className: 'github-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
