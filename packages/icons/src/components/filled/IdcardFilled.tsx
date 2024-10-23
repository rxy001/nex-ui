import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Idcard from '../../svg/filled/idcard.svg'
import type { IconProps } from '../../types'

export const IdcardFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Idcard, { className: 'idcard-filled' })
  return <Icon {...props} ref={ref} />
})
