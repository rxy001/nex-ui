import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Skype from '../../svg/filled/skype.svg'
import type { IconProps } from '../../types'

export const SkypeFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Skype, { className: 'skype-filled' })
  return <Icon {...props} ref={ref} />
})
