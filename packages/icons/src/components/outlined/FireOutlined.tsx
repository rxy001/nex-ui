import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fire from '../../svg/outlined/fire.svg'
import type { IconProps } from '../../types'

export const FireOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Fire, { className: 'fire-outlined' })
  return <Icon {...props} ref={ref} />
})
