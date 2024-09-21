import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Edit from '../../svg/outlined/edit.svg'
import type { IconProps } from '../../types'

export const EditOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Edit)
  return <Icon {...props} ref={ref} />
})
