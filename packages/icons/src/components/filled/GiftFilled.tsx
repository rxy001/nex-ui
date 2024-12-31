import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gift from '../../svg/filled/gift.svg'
import type { IconProps } from '../../types'

export const GiftFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Gift, { className: 'gift-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

GiftFilled.displayName = 'GiftFilled'
