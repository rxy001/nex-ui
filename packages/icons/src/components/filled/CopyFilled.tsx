import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Copy from '../../svg/filled/copy.svg'
import type { IconProps } from '../../types'

export const CopyFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Copy, { className: 'copy-filled' })
  return <Icon {...props} ref={ref} />
})
