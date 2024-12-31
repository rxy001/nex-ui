import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import X from '../../svg/outlined/x.svg'
import type { IconProps } from '../../types'

export const XOutlined = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(X, { className: 'x-outlined' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

XOutlined.displayName = 'XOutlined'
