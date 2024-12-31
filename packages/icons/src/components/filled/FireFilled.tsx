import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fire from '../../svg/filled/fire.svg'
import type { IconProps } from '../../types'

export const FireFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Fire, { className: 'fire-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

FireFilled.displayName = 'FireFilled'
