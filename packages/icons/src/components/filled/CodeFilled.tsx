import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Code from '../../svg/filled/code.svg'
import type { IconProps } from '../../types'

export const CodeFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Code, { className: 'code-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
