import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Eye from '../../svg/filled/eye.svg'
import type { IconProps } from '../../types'

export const EyeFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Eye, { className: 'eye-filled' })
  return <Icon {...props} ref={ref} />
})
