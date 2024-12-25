import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import TwitterCircle from '../../svg/filled/twitter-circle.svg'
import type { IconProps } from '../../types'

export const TwitterCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(TwitterCircle, { className: 'twitter-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
