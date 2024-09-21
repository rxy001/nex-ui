import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Phone from '../../svg/filled/phone.svg'
import type { IconProps } from '../../types'

export const PhoneFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Phone)
  return <Icon {...props} ref={ref} />
})
