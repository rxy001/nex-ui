import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tool from '../../svg/filled/tool.svg'
import type { IconProps } from '../../types'

export const ToolFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Tool)
  return <Icon {...props} ref={ref} />
})
