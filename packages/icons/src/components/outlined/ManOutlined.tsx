import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Man from '../../svg/outlined/man.svg'
import type { IconProps } from '../../types'

export const ManOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Man)
  return <Icon {...props} ref={ref} />
})
