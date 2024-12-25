import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bug from '../../svg/filled/bug.svg'
import type { IconProps } from '../../types'

export const BugFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Bug, { className: 'bug-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
