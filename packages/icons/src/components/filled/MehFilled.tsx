import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Meh from '../../svg/filled/meh.svg'
import type { IconProps } from '../../types'

export const MehFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Meh, { className: 'meh-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

MehFilled.displayName = 'MehFilled'
