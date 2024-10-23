import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import X from '../../svg/filled/x.svg'
import type { IconProps } from '../../types'

export const XFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(X, { className: 'x-filled' })
  return <Icon {...props} ref={ref} />
})
