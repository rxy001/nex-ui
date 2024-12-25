import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Read from '../../svg/filled/read.svg'
import type { IconProps } from '../../types'

export const ReadFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Read, { className: 'read-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
