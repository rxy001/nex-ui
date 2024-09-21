import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fire from '../../svg/filled/fire.svg'
import type { IconProps } from '../../types'

export const FireFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Fire)
  return <Icon {...props} ref={ref} />
})
