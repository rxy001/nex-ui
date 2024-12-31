import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Retweet from '../../svg/outlined/retweet.svg'
import type { IconProps } from '../../types'

export const RetweetOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Retweet, { className: 'retweet-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RetweetOutlined.displayName = 'RetweetOutlined'
