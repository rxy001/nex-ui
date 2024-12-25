import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Robot from '../../svg/outlined/robot.svg'
import type { IconProps } from '../../types'

export const RobotOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Robot, { className: 'robot-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
