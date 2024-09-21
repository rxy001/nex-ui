import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Diff from '../../svg/outlined/diff.svg'
import type { IconProps } from '../../types'

export const DiffOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Diff)
  return <Icon {...props} ref={ref} />
})
