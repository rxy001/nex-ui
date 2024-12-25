import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import X from '../../svg/filled/x.svg'
import type { IconProps } from '../../types'

export const XFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(X, { className: 'x-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
