import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Lock from '../../svg/outlined/lock.svg'
import type { IconProps } from '../../types'

export const LockOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Lock)
  return <Icon {...props} ref={ref} />
})
