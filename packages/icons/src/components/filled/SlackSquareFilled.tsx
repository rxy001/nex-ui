import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SlackSquare from '../../svg/filled/slack-square.svg'
import type { IconProps } from '../../types'

export const SlackSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SlackSquare)
    return <Icon {...props} ref={ref} />
  },
)
