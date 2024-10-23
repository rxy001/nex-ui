import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Meh from '../../svg/filled/meh.svg'
import type { IconProps } from '../../types'

export const MehFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Meh, { className: 'meh-filled' })
  return <Icon {...props} ref={ref} />
})
