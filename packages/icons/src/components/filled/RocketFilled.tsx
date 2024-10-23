import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rocket from '../../svg/filled/rocket.svg'
import type { IconProps } from '../../types'

export const RocketFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Rocket, { className: 'rocket-filled' })
  return <Icon {...props} ref={ref} />
})
