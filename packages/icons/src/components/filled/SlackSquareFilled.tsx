import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SlackSquare from '../../svg/filled/slack-square.svg'
import type { IconProps } from '../../types'

export const SlackSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SlackSquare, { className: 'slack-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SlackSquareFilled.displayName = 'SlackSquareFilled'
