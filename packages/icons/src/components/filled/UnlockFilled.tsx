import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Unlock from '../../svg/filled/unlock.svg'
import type { IconProps } from '../../types'

export const UnlockFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Unlock, { className: 'unlock-filled' })
  return <Icon {...props} ref={ref} />
})
