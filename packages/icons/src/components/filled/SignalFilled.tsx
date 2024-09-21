import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Signal from '../../svg/filled/signal.svg'
import type { IconProps } from '../../types'

export const SignalFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Signal)
  return <Icon {...props} ref={ref} />
})
