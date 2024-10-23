import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Meh from '../../svg/outlined/meh.svg'
import type { IconProps } from '../../types'

export const MehOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Meh, { className: 'meh-outlined' })
  return <Icon {...props} ref={ref} />
})
