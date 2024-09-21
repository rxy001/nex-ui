import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Yuque from '../../svg/filled/yuque.svg'
import type { IconProps } from '../../types'

export const YuqueFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Yuque)
  return <Icon {...props} ref={ref} />
})
