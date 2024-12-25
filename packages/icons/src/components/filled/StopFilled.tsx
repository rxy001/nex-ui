import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Stop from '../../svg/filled/stop.svg'
import type { IconProps } from '../../types'

export const StopFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Stop, { className: 'stop-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
