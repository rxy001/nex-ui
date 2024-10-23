import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Rest from '../../svg/outlined/rest.svg'
import type { IconProps } from '../../types'

export const RestOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Rest, { className: 'rest-outlined' })
  return <Icon {...props} ref={ref} />
})
