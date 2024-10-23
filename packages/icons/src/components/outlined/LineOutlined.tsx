import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Line from '../../svg/outlined/line.svg'
import type { IconProps } from '../../types'

export const LineOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Line, { className: 'line-outlined' })
  return <Icon {...props} ref={ref} />
})
