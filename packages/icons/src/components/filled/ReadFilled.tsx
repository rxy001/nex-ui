import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Read from '../../svg/filled/read.svg'
import type { IconProps } from '../../types'

export const ReadFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Read, { className: 'read-filled' })
  return <Icon {...props} ref={ref} />
})
