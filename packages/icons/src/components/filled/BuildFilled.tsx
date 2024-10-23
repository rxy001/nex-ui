import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Build from '../../svg/filled/build.svg'
import type { IconProps } from '../../types'

export const BuildFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Build, { className: 'build-filled' })
  return <Icon {...props} ref={ref} />
})
