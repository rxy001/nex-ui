import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tool from '../../svg/filled/tool.svg'
import type { IconProps } from '../../types'

export const ToolFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Tool, { className: 'tool-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
