import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Robot from '../../svg/outlined/robot.svg'
import type { IconProps } from '../../types'

export const RobotOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Robot, { className: 'robot-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
