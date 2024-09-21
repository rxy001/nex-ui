import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bug from '../../svg/outlined/bug.svg'
import type { IconProps } from '../../types'

export const BugOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Bug)
  return <Icon {...props} ref={ref} />
})
