'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Slack from '../../svg/outlined/slack.svg'
import type { IconProps } from '../../types'

export const SlackOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Slack, { className: 'slack-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SlackOutlined.displayName = 'SlackOutlined'
