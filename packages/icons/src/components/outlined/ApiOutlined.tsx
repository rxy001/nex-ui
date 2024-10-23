import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Api from '../../svg/outlined/api.svg'
import type { IconProps } from '../../types'

export const ApiOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Api, { className: 'api-outlined' })
  return <Icon {...props} ref={ref} />
})
