import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Hdd from '../../svg/filled/hdd.svg'
import type { IconProps } from '../../types'

export const HddFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Hdd, { className: 'hdd-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
