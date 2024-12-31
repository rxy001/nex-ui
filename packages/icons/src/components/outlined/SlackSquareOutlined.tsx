import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SlackSquare from '../../svg/outlined/slack-square.svg'
import type { IconProps } from '../../types'

export const SlackSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SlackSquare, { className: 'slack-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SlackSquareOutlined.displayName = 'SlackSquareOutlined'
