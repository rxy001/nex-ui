import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tool from '../../svg/outlined/tool.svg'
import type { IconProps } from '../../types'

export const ToolOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Tool, { className: 'tool-outlined' })
  return <Icon {...props} ref={ref} />
})
