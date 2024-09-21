import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Read from '../../svg/outlined/read.svg'
import type { IconProps } from '../../types'

export const ReadOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Read)
  return <Icon {...props} ref={ref} />
})
