import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Copy from '../../svg/outlined/copy.svg'
import type { IconProps } from '../../types'

export const CopyOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Copy)
  return <Icon {...props} ref={ref} />
})
