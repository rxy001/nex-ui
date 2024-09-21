import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Golden from '../../svg/filled/golden.svg'
import type { IconProps } from '../../types'

export const GoldenFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Golden)
  return <Icon {...props} ref={ref} />
})
