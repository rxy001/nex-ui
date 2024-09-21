import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Robot from '../../svg/filled/robot.svg'
import type { IconProps } from '../../types'

export const RobotFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Robot)
  return <Icon {...props} ref={ref} />
})
