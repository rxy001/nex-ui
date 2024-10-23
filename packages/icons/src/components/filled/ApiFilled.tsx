import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Api from '../../svg/filled/api.svg'
import type { IconProps } from '../../types'

export const ApiFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Api, { className: 'api-filled' })
  return <Icon {...props} ref={ref} />
})
