import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Save from '../../svg/filled/save.svg'
import type { IconProps } from '../../types'

export const SaveFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Save)
  return <Icon {...props} ref={ref} />
})
