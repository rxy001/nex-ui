import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Key from '../../svg/outlined/key.svg'
import type { IconProps } from '../../types'

export const KeyOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Key, { className: 'key-outlined' })
  return <Icon {...props} ref={ref} />
})
