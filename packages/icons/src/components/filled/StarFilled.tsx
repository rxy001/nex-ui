import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Star from '../../svg/filled/star.svg'
import type { IconProps } from '../../types'

export const StarFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Star, { className: 'star-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

StarFilled.displayName = 'StarFilled'
