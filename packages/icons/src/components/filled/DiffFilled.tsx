import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Diff from '../../svg/filled/diff.svg'
import type { IconProps } from '../../types'

export const DiffFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Diff, { className: 'diff-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
