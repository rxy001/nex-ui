import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Apple from '../../svg/filled/apple.svg'
import type { IconProps } from '../../types'

export const AppleFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Apple)
  return <Icon {...props} ref={ref} />
})
