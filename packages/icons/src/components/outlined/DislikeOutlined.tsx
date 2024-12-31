import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dislike from '../../svg/outlined/dislike.svg'
import type { IconProps } from '../../types'

export const DislikeOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Dislike, { className: 'dislike-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DislikeOutlined.displayName = 'DislikeOutlined'
