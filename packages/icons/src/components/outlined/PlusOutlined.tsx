import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Plus from '../../svg/outlined/plus.svg'
import type { IconProps } from '../../types'

export const PlusOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Plus, { className: 'plus-outlined' })
  return <Icon {...props} ref={ref} />
})
