import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import X from '../../svg/outlined/x.svg'
import type { IconProps } from '../../types'

export const XOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(X)
  return <Icon {...props} ref={ref} />
})
