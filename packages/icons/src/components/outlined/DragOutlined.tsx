import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Drag from '../../svg/outlined/drag.svg'
import type { IconProps } from '../../types'

export const DragOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Drag)
  return <Icon {...props} ref={ref} />
})
