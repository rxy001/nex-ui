import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Lock from '../../svg/filled/lock.svg'
import type { IconProps } from '../../types'

export const LockFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Lock, { className: 'lock-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
