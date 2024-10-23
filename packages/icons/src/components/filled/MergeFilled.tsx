import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Merge from '../../svg/filled/merge.svg'
import type { IconProps } from '../../types'

export const MergeFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Merge, { className: 'merge-filled' })
  return <Icon {...props} ref={ref} />
})
