import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Link from '../../svg/outlined/link.svg'
import type { IconProps } from '../../types'

export const LinkOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Link, { className: 'link-outlined' })
  return <Icon {...props} ref={ref} />
})
