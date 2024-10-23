import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rest from '../../svg/filled/rest.svg'
import type { IconProps } from '../../types'

export const RestFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Rest, { className: 'rest-filled' })
  return <Icon {...props} ref={ref} />
})
