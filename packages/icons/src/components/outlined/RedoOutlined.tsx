import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Redo from '../../svg/outlined/redo.svg'
import type { IconProps } from '../../types'

export const RedoOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Redo, { className: 'redo-outlined' })
  return <Icon {...props} ref={ref} />
})
