import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Copy from '../../svg/filled/copy.svg'
import type { IconProps } from '../../types'

export const CopyFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Copy, { className: 'copy-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
