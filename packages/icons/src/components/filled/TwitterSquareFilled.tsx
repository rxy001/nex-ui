import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import TwitterSquare from '../../svg/filled/twitter-square.svg'
import type { IconProps } from '../../types'

export const TwitterSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(TwitterSquare, { className: 'twitter-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TwitterSquareFilled.displayName = 'TwitterSquareFilled'
