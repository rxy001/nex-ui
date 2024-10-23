import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Diff from '../../svg/filled/diff.svg'
import type { IconProps } from '../../types'

export const DiffFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Diff, { className: 'diff-filled' })
  return <Icon {...props} ref={ref} />
})
