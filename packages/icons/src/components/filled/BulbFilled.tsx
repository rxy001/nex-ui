import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bulb from '../../svg/filled/bulb.svg'
import type { IconProps } from '../../types'

export const BulbFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Bulb, { className: 'bulb-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

BulbFilled.displayName = 'BulbFilled'
