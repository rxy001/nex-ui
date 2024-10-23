import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Lock from '../../svg/filled/lock.svg'
import type { IconProps } from '../../types'

export const LockFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Lock, { className: 'lock-filled' })
  return <Icon {...props} ref={ref} />
})
