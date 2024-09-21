import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Delete from '../../svg/filled/delete.svg'
import type { IconProps } from '../../types'

export const DeleteFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Delete)
  return <Icon {...props} ref={ref} />
})
