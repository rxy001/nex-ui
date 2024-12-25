import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Moon from '../../svg/filled/moon.svg'
import type { IconProps } from '../../types'

export const MoonFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Moon, { className: 'moon-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
