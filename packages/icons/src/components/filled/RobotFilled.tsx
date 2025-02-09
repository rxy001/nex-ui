'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Robot from '../../svg/filled/robot.svg'
import type { IconProps } from '../../types'

export const RobotFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Robot, { className: 'robot-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RobotFilled.displayName = 'RobotFilled'
