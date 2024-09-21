import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Undo from '../../svg/outlined/undo.svg'
import type { IconProps } from '../../types'

export const UndoOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Undo)
  return <Icon {...props} ref={ref} />
})
