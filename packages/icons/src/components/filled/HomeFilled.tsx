import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Home from '../../svg/filled/home.svg'
import type { IconProps } from '../../types'

export const HomeFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Home, { className: 'home-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
