import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gif from '../../svg/outlined/gif.svg'
import type { IconProps } from '../../types'

export const GifOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Gif, { className: 'gif-outlined' })
  return <Icon {...props} ref={ref} />
})
