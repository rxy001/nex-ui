import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SlackCircle from '../../svg/filled/slack-circle.svg'
import type { IconProps } from '../../types'

export const SlackCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SlackCircle, { className: 'slack-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
