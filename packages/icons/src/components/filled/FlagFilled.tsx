import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Flag from '../../svg/filled/flag.svg'
import type { IconProps } from '../../types'

export const FlagFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Flag)
  return <Icon {...props} ref={ref} />
})
