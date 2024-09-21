import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Alert from '../../svg/filled/alert.svg'
import type { IconProps } from '../../types'

export const AlertFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Alert)
  return <Icon {...props} ref={ref} />
})
