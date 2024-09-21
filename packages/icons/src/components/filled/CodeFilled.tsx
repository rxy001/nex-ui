import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Code from '../../svg/filled/code.svg'
import type { IconProps } from '../../types'

export const CodeFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Code)
  return <Icon {...props} ref={ref} />
})
